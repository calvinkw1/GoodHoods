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

  $.getJSON('/CaliZillowSimp.json', function(hoods) {
  console.log(hoods.features[0].properties.CITY);
  // console.log(hoods.features[0]);
  var labels = hoods;
  console.log(hoods);
  // console.log($("#search_input").toArray());
    $("#search_input").on("submit", function(x) {
       $("#labels").empty();
      for (i = 0; i < labels.features.length; i++) {
          var city = $("#city").val();
        if (city == labels.features[i].properties.CITY) {
          $("#labels").append("<li><a>" + labels.features[i].properties.NAME + "</a></li>");
        }
      }
    });
  map.data.addGeoJson(hoods);
 }); 

  var featureStyle = {
    fillColor: 'green',
    strokeColor: '#E9DBE8',
    strokeWeight: 2
  };
   map.data.setStyle(featureStyle); 
   map.data.addListener('mouseover', function(event) {
   map.data.overrideStyle(event.feature, {fillColor: 'red'});
   });
   map.data.addListener('mouseout', function(event) {
   map.data.overrideStyle(event.feature, {fillColor: 'green'});
   });
}  //END OF INTIALIZE FUNCTION

google.maps.event.addDomListener(window, 'load', initialize);




$(document).ready(function(){
  
  function searchBox() {  
    console.log($("#search_input").toArray());
    $("#search_input").on("submit", function(e) {

      e.preventDefault(); 
      var city = $("#city").val();
      var state = $("#state").val();
      var location = city + "+" + state;
   
      var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDE6F79FbnrSc9hZlurECTyBJoEyHCj-Nc"); // this encodes the URL to account for spaces
      console.log(url);
      // GETS the lat/lng from google's geocode api
        $.getJSON(url, function(data) {
          console.log(data);
          var Lat = data.results[0].geometry.location.lat; // json result stored in variable
          var Lng = data.results[0].geometry.location.lng; // json result stored in variable
            console.log(Lat);
            console.log(Lng);
           map.panTo(new google.maps.LatLng(Lat,Lng));
           map.setZoom(12);
                  
        }); 
    });
  }
  searchBox();
});
 








