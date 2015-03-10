var map, Lat, Lng, myLatLng, loc = Lat + Lng;

function initialize() {

  var markers = [];
  var rendererOptions = {
    draggable: true
   };
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.7749300 , -122.4194200),
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true
  }; 
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);   
}
google.maps.event.addDomListener(window, 'load', initialize);




$(document).ready(function(){
    


  // this function is tied in with the search action in the main controller to pull zillow api data
  $("#search-input").submit(function(e) {
    e.preventDefault();
        var city = $("#city").val();
    var state = $("#state").val();
    var location = city + "+" + state;
    var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDE6F79FbnrSc9hZlurECTyBJoEyHCj-Nc"); // this encodes the URL to account for spaces
    console.log(url);
    // getJSON function below to retrieve the lat/lng from google's geocode api
    $.getJSON(url, function(data) {
      console.log(data);
      var Lat = data.results[0].geometry.location.lat; // json result stored in variable
      var Lng = data.results[0].geometry.location.lng; // json result stored in variable
         // LatLng = (Lat , Lng);
         console.log(Lat);
         console.log(Lng);
       map.panTo(new google.maps.LatLng(Lat,Lng));
    $("#city-summary").empty();
    $("#people").empty();
    $("#characteristics").empty();
    $("#ages").empty();
    $("#kids").empty();
    $("#relationships").empty();
    $("#charts").empty();
    var city = $("#city").val();
    var state = $("#state").val();
    var neighborhood = $("#neighborhood").val();
    var url = "/search";
    $.getJSON(url, {city:city, state:state, neighborhood:neighborhood}, function(data) {
      console.log(data);
      // console.log(data.demographics.response.pages.page);
      var livesHere = data.demographics.response.pages.page[2].segmentation.liveshere;
      $("#city-summary").append("<h5>Summary</h5>");
      for (i = 0; i < livesHere.length; i++) {
        $("#city-summary").append("<p>" + livesHere[i].description + "</p>");
      }
      var charts = data.demographics.response.charts.chart;
      for (i = 0; i < charts.length; i++) {
        $("#charts").append("<h5>" + charts[i].name + "</h5>");
        $("#charts").append("<div><img src=" + charts[i].url + "></div>");
      }
      var people = data.demographics.response.pages.page[2].tables.table[0].data.attribute;
      $("#people").append(data.demographics.response.pages.page[2].tables.table[0].name);
      for (i = 0; i < people.length; i++) {
        // People data
        $("#people").append("<li>" + people[i].name + "</li>");
        $("#people").append("<p>" + people[i].values.neighborhood.value + "</p>");
      }
      var ages = data.demographics.response.pages.page[2].tables.table[1];
      $("#ages").append("<li>" + ages.name + "</li>");
      for (i = 0; i < ages.data.attribute.length; i++) {
        $("#ages").append("<li>" + ages.data.attribute[i].name + "</li>");
        $("#ages").append("<p>" + ages.data.attribute[i].value + "</p>");
      }
      var kids = data.demographics.response.pages.page[2].tables.table[3];
      $("#kids").append("<li>" + kids.name + "</li>");
      for (i = 0; i < kids.data.attribute.length; i++) {
        $("#kids").append("<p>" + kids.data.attribute[i].name + "</p>");
        $("#kids").append("<p>" + kids.data.attribute[i].value + "</p>");
      }
      var relationships = data.demographics.response.pages.page[2].tables.table[4];
      $("#relationships").append("<li>" + relationships.name);
      for (i = 0; i < relationships.data.attribute.length; i++) {
        $("#relationships").append("<p>" + relationships.data.attribute[i].name + "</p>");
        $("#relationships").append("<p>" + Math.round(100 * relationships.data.attribute[i].value) + "%</p>");
      }
      var characteristics = data.demographics.response.pages.page[2].uniqueness.category;
      $("#characteristics").append("<h5>Neighborhood Characteristics</h5>");
      for (i = 0; i < characteristics.length; i++) {
        $("#characteristics").append("<tr>");
        $("#characteristics").append("<th>" + characteristics[i].type + "</th>");
        $("#characteristics").append("</tr>");
        for (n = 0; n < characteristics[i].characteristic.length; n++) {
          $("#characteristics").append("<tr>");
          $("#characteristics").append("<td>" + characteristics[i].characteristic[n] + "</td>");
          $("#characteristics").append("</tr>");
        }
      }
console.log(data.demographics.response);

    });
  });
});
        

});









