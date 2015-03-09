$(document).ready(function() {

google.maps.event.addDomListener(window, 'load', initialize);


  function initialize() {
    var rendererOptions = {
      draggable: true
    };
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(37.7749300 , -122.4194200),
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }

  // this function is tied in with the search action in the main controller to pull zillow api data
  $("#search-input").submit(function(e) {
    e.preventDefault();
    $("#charts").empty();
    var city = $("#city").val();
    var state = $("#state").val();
    var url = "/search";
    $.getJSON(url, {city:city, state:state}, function(data) {
      // console.log(data.demographics.response.pages.page);
      charts = data.demographics.response.charts.chart;
      livesHere = data.demographics.response.pages.page[2].segmentation.liveshere;
      for (i = 0; i < charts.length; i++) {
        $("#charts").append("<h5>" + charts[i].name + "</h5>");
        $("#charts").append("<div><img src=" + charts[i].url + "></div>");
      }
      $("#city-summary").append("<h5>Summary</h5>");
      for (i = 0; i < livesHere.length; i++) {
        $("#city-summary").append("<p>" + livesHere[i].description + "</p>");
      }
      console.log(data.demographics.response.pages.page[2]);
    });
  });



});

// function initialize() {

//   var markers = [];
//    var mapOptions = {
//     zoom: 1,
//     center: new google.maps.LatLng(37.7749300 , -122.4194200),
//     panControl: true,
//     zoomControl: true,
//     mapTypeControl: true,
//     scaleControl: true,
//     streetViewControl: true,
//     overviewMapControl: true
//   };
  
//   var map = new google.maps.Map(document.getElementById('map-canvas'), { 
//     mapTypeId: google.maps.MapTypeId.ROADMAP

//   });

//   // var defaultBounds = new google.maps.LatLngBounds(
//   //     new google.maps.LatLng(-33.8902, 151.1759),
//   //     new google.maps.LatLng(-33.8474, 151.2631));
//   // map.fitBounds(defaultBounds);

//   // Create the search box and link it to the UI element.
//   var input = (document.getElementById('search-input'));

//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

//   var searchBox = new google.maps.places.SearchBox((input));

//   // [START region_getplaces]
//   // Listen for the event fired when the user selects an item from the
//   // pick list. Retrieve the matching places for that item.
//   google.maps.event.addListener(searchBox, 'places_changed', function() {
//     var places = searchBox.getPlaces();

//     if (places.length === 0) {
//       return;
//     }
//     for (var i = 0, marker; marker = markers[i]; i++) {
//       marker.setMap(null);
//     }

//     // For each place, get the icon, place name, and location.
//     markers = [];
//     var bounds = new google.maps.LatLngBounds();
//     for (var i = 0, place; place = places[i]; i++) {
//       var image = {
//         url: place.icon,
//         size: new google.maps.Size(71, 71),
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(17, 34),
//         scaledSize: new google.maps.Size(25, 25)
//       };

//       // Create a marker for each place.
//       var marker = new google.maps.Marker({
//         map: map,
//         icon: image,
//         title: place.name,
//         position: place.geometry.location,
//         zoom: 1
//       });

//       markers.push(marker);
// google.maps.event.addListener(marker, "click", openWindow);
//       bounds.extend(place.geometry.location);
//     }

//     map.fitBounds(bounds);
//   });
//   // [END region_getplaces]

//   // Bias the SearchBox results towards places that are within the bounds of the
//   // current map's viewport.
//   google.maps.event.addListener(map, 'bounds_changed', function() {
//     var bounds = map.getBounds();
//     searchBox.setBounds(bounds);
//   });


//NOT SURE ABOUT THIS




// function openWindow() {
//   var infoWindow = new google.maps.infoWindow();
//   infowindow.open(map, marker);
//   var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
//   autocomplete.bindTo('bounds', map);

//   var marker = new google.maps.Marker({
//     map: map
//   });
//     var place = autocomplete.getPlace();
//     // console.log("infowindow",infowindow);
//     // console.log("placesMarker",this);
//     marker.setPosition(place.geometry.location);
//     infoWindow.setContent("<div style='color:black; width: 75px;'>" + place.name + "</div><button id='removeMarker'>Remove</button>");
//     // infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
    
//     $(this).css("background-color", "#a9fcf5");
//   }


// NOT SURE ABOUT THIS
  // var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  // autocomplete.bindTo('bounds', map);
  // var infoWindow = new google.maps.infoWindow();
  // var marker = new google.maps.Marker({
  //   map: map
  // });
// NOT SURE ABOUT THIS
// NOT SURE ABOUT THIS

  // google.maps.event.addListener(autocomplete, 'place_changed', function() {
  //   infoWindow.close();
  //   var place = autocomplete.getPlace();
  //   if (place.geometry.viewport) {
  //     map.fitBounds(place.geometry.viewport);
  //   } else {
  //     map.setCenter(place.geometry.location);
  //     map.setZoom(1);
  //   }
  //   marker.setPosition(place.geometry.location);
  //   infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  //   infoWindow.open(map, marker);
  //   google.maps.event.addListener(marker, 'click', function(e){
  //    infoWindow.open(map, marker);
  //   });

  // });
  // NOT SURE ABOUT THIS









