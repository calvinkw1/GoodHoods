var map, Lat, Lng, myLatLng, latitude, longitude, city, state, neighborhood, weather, wuCity, wuNeighborhood, wuStationID;

function initialize() {
  var markers = [];
  var rendererOptions = {
    draggable: true
  };

  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(37.7749300 , -122.4194200),
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true
  }; 

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var featureStyle = {
    clickable: true,
    fillColor: 'green',
    strokeColor: '#E9DBE8',
    strokeWeight: 1,
    fillOpacity: 0.3
  };

  map.data.setStyle(featureStyle); 
  map.data.addListener('mouseover', function(event) {
   map.data.overrideStyle(event.feature, {fillColor: 'red'});
   document.getElementById('info-box').textContent = event.feature.getProperty('NAME');
   });
   map.data.addListener('mouseout', function(event) {
   map.data.overrideStyle(event.feature, {fillColor: 'green'});
   });
   map.data.addListener('click', function(event) {
   event.feature.setProperty({fillColor: 'gold'});
   // map.setZoom(14);
   });
}  //END OF INTIALIZE FUNCTION

google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function() {

  function clearData() {
    $("#hoods").empty();
    $("#city-summary").empty();
    $("#people").empty();
    $("#characteristics").empty();
    $("#ages").empty();
    $("#kids").empty();
    $("#relationships").empty();
    $("#charts").empty();
  }

  $("#search-input").submit(function(e) {
    e.preventDefault();
    city = $("#city").val();
    state = $("#state").val();
    // neighborhood = $("#neighborhood").val();
    
    mapCall();
    clearData();
    hoodBounds();
  });

  $("#hoods").on("click", "#neighborhood", function(e) {
    e.preventDefault();
    neighborhood = $(this).text();
    console.log(neighborhood);
    var clickLocation = $(this).text().split(' ').join('+') + "+" + city.split(' ').join('+');
    var result = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + clickLocation +  "&key=AIzaSyDE6F79FbnrSc9hZlurECTyBJoEyHCj-Nc&z=15");
    $.getJSON(result, function(clickData) {
          var latitude = clickData.results[0].geometry.location.lat; // json result stored in variable
          var longitude = clickData.results[0].geometry.location.lng;
          console.log(latitude + " " + longitude);
            map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            map.setCenter(new google.maps.LatLng(latitude,longitude));
            map.setZoom(15);
    });
    startAPICalls();

  });
  
  function hoodBounds() {
  $.getJSON('/CaliZillowSimp.json', function(hoods) {
      for (i = 0; i < hoods.features.length; i++) {
        if (city == hoods.features[i].properties.CITY) {
          $("#hoods").append("<li><a id='neighborhood' href='javascript:void(0)'>" + hoods.features[i].properties.NAME + "</a></li>");
          $.post('/save',  {
            name: hoods.features[i].properties.NAME,
            city: hoods.features[i].properties.CITY,
            state: hoods.features[i].properties.STATE
          });
        }
      }
    map.data.addGeoJson(hoods);
    }); 
  }

  function mapCall() {
    var location = city + "+" + state;
    var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDE6F79FbnrSc9hZlurECTyBJoEyHCj-Nc");
    // getJSON function below to retrieve the lat/lng from google's geocode api
    $.getJSON(url, function(data) {
      var Lat = data.results[0].geometry.location.lat; // json result stored in variable
      var Lng = data.results[0].geometry.location.lng; // json result stored in variable
      map.panTo(new google.maps.LatLng(Lat,Lng));
      map.setZoom(12);
    });
  }

  function startAPICalls() {
    var url = "/search.json";
    $.getJSON(url, {city:city, state:state, neighborhood:neighborhood}, function(data) {
      zillow = data.zillowData;
      weather = data.weatherData.location.nearby_weather_stations.pws.station;
      zillowAPIData();
      findWUStation();
      weatherCall();
            
    });
  }

  function findWUStation() {
    for (i = 0; i < weather.length; i++) {
      wuCity = weather[i].city.toLowerCase();
      wuNeighborhood = weather[i].neighborhood.toLowerCase();
      if (wuNeighborhood.indexOf(neighborhood.toLowerCase()) !== -1) {
        wuStationID = weather[i].id;
              console.log(wuCity + " " + wuNeighborhood + " " + wuStationID);

        break;
      }
    }
  }

  function weatherCall() {
    console.log(wuStationID);
    var wuURL = "https://api.wunderground.com/api/acf7fb055f9d4a5d/conditions/q/pws:" + wuStationID + ".json";
    $.getJSON(wuURL, function(data) {
      weather = data.current_observation;
      $("#weather").append("<p>Current Temperature: " + weather.temperature_string + "</p>");
      $("#weather").append("<p>Current Temperature: " + weather.feelslike_string + "</p>");
      $("#weather").append("<p><img src='" + weather.icon_url + "'></p>");
      $("#weather").append("<p>" + weather.icon + "</p>");
      $("#weather").append("<p>" + weather.weather + "</p>");
      $("#weather").append("<p>" + weather.wind_dir + "</p>");
      $("#weather").append("<p>" + weather.wind_gust_mph + "</p>");
      $("#weather").append("<p>" + weather.wind_gust_kph + "</p>");
      $("#weather").append("<p>" + weather.wind_dir + "</p>");
      $("#weather").append("<p>Powered by<img src='" + weather.image.url + "'></p>");
    });
  }

  function zillowAPIData() {

    console.log(zillow);

    var livesHere = zillow.demographics.response.pages.page[2].segmentation.liveshere;
    $("#city-summary").append("<h5>Resident Psychographics</h5>");
    for (i = 0; i < livesHere.length; i++) {
      $("#city-summary").append("<p><i>" + livesHere[i].title + "</i></p>");    
      $("#city-summary").append("<p>" + livesHere[i].description + "</p>");
    }
    
    var people = zillow.demographics.response.pages.page[2].tables.table[0].data.attribute;
    console.log(people);
    $("#people").append("<h5>Resident Demographics</h5>");
      $("#people").append("<p><i>" + people[0].name + "</i><p>");
      $("#people").append("<p>$" + Math.round(people[0].values.neighborhood.value) + "</p>");
      $("#people").append("<p><i>" + people[1].name + "</i><p>");
      $("#people").append("<p>" + (people[1].values.neighborhood.value * 100).toFixed(2) + "%</p>");
      $("#people").append("<p><i>" + people[2].name + "</i><p>");
      $("#people").append("<p>" + (people[2].values.neighborhood.value * 100).toFixed(2) + "%</p>");
      $("#people").append("<p><i>" + people[3].name + "</i><p>");
      $("#people").append("<p>" + (people[3].values.neighborhood.value) + "</p>");
      $("#people").append("<p><i>" + people[4].name + "</i><p>");
      $("#people").append("<p>" + (people[4].values.neighborhood.value * 100).toFixed(2) + "%</p>");
      $("#people").append("<p><i>" + people[5].name + "</i><p>");
      $("#people").append("<p>" + ((people[5].values.neighborhood.value * 100) / 100).toFixed(2) + "</p>");
      $("#people").append("<p><i>" + people[6].name + "</i><p>");
      $("#people").append("<p>" + Math.round(people[6].values.neighborhood.value) + "</p>");

    var kids = zillow.demographics.response.pages.page[2].tables.table[3];
    $("#kids").append("<h5>Households with Children</h5>");
      $("#kids").append("<p><i>Percentage WITH children</i></p>");
      $("#kids").append("<p>" + (kids.data.attribute[1].value * 100).toFixed(2) + "%</p>");
      $("#kids").append("<p><i>Percentage WITHOUT children</i></p>");
      $("#kids").append("<p>" + (kids.data.attribute[0].value * 100).toFixed(2) + "%</p>");
    

    var characteristics = zillow.demographics.response.pages.page[2].uniqueness.category;
    $("#characteristics").append("<p><i>" + characteristics[1].type + "</i></p>");
    for (n = 0; n < characteristics[1].characteristic.length; n++) {
          $("#characteristics").append("<p>" + characteristics[1].characteristic[n] + "</p>");
    }
    $("#characteristics").append("<p><i>" + characteristics[2].type + "</i></p>");
    for (n = 0; n < characteristics[2].characteristic.length; n++) {
          $("#characteristics").append("<p>" + characteristics[2].characteristic[n] + "</p>");
    }

    var ages = zillow.demographics.response.pages.page[2].tables.table[1];
    $("#ages").append("<h5>Age demographics by decade");
    for (i = 0; i < ages.data.attribute.length; i++) {
      $("#ages").append("<p><i>" + ages.data.attribute[i].name + "</i></p>");
      $("#ages").append("<p>" + (100 * ages.data.attribute[i].value).toFixed(2) + "%</p>");
    }

    var relationships = zillow.demographics.response.pages.page[2].tables.table[4];
    $("#relationships").append("<h5>Relationship Status</h5>");
    for (i = 0; i < relationships.data.attribute.length; i++) {
      $("#relationships").append("<p><i>" + relationships.data.attribute[i].name + "</i></p>");
      $("#relationships").append("<p>" + (100 * relationships.data.attribute[i].value).toFixed(2) + "%</p>");
    }

    var charts = zillow.demographics.response.charts.chart;
    $("#charts").append("<h5>Home Value Information</h5>");
      $("#charts").append("<p><i>" + charts[1].name + "</i></p>");
      $("#charts").append("<p><img src=" + charts[1].url + "></div>");
      $("#charts").append("<p><i>" + charts[3].name + "</i></p>");
      $("#charts").append("<p><img src=" + charts[3].url + "></p>");
      $("#charts").append("<p><i>" + charts[5].name + "</i></p>");
      $("#charts").append("<p><img src=" + charts[5].url + "></p>");
      $("#charts").append("<p><i>" + charts[6].name + "</i></p>");
      $("#charts").append("<p><img src=" + charts[6].url + "></p>");  
      $("#charts").append("<p><i>" + charts[7].name + "</i></p>");
      $("#charts").append("<p><img src=" + charts[7].url + "></p>");
    }

});