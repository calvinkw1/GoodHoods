
var map,
    name,
    placesMarker,
    wyptMarker,
    infowindow,
    startLat,
    startLng,
    start = startLat + startLng,
    lat,
    lng,
    endLat,
    endLng,
    endDest = parseInt(endLat) + parseInt(endLng),
    wayptsArray = [],
    placesArray = [],
    mapLoaded = false,
    directionsDisplay,
    directionsService = new google.maps.DirectionsService(),
    poly,
    polyOptions,
    polylineOptions = new google.maps.Polyline(),
    path;

  google.maps.event.addDomListener(window, 'load', initialize);

function locationSearch() {
  $("form").on("submit", function(e) {
    var location = $("#addybox").val();
    var url = encodeURI("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDE6F79FbnrSc9hZlurECTyBJoEyHCj-Nc"); // this encodes the URL to account for spaces
    e.preventDefault();
  
    // getJSON function below to retrieve the lat/lng from google's geocode api

    $.getJSON(url, function(data) {
        console.log(data);
      var privLat = data.results[0].geometry.location.lat; // json result stored in variable
      var privLng = data.results[0].geometry.location.lng; // json result stored in variable
      startLat = privLat; // storing private variables in public variables
      startLng = privLng;
      start = new google.maps.LatLng(startLat, startLng);

      addMarker(); // calling function to drop marker on map
    });
    $("#addyBox").val(""); // clear text after submit
    $(".instructPanel > img").attr("src", "");
    $(".instructPanel > div").text("Now click anywhere on the map to set a marker and begin plotting your route!");
  });
}

// google.maps.event.addDomListener(document.getElementById("submitBtn"), "click", initialize);

function initialize() {
  var rendererOptions = {
    draggable: true
  };
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(37.7749300 , -122.4194200),
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true
  };
  var polyOptions = {
    path: wayptsArray,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  };
  poly = new google.maps.Polyline(polyOptions);
  poly.setMap(map);
  directionsDisplay = new google.maps.DirectionsRenderer(polylineOptions);
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  mapLoaded = true;
  $(".addyForm").slideDown("slow");
  $(".instructPanel").slideDown("slow");
  $(".getStarted").hide();
  $(".mainBox").css("padding-left", "0");
  $(".mainBox").css("background-color", "black");
  $(".mainBox").css("opacity", "1");
  google.maps.event.addListener(document.getElementsByClassName("addyForm"), "submit", locationSearch());
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions-panel"));
}

function addMarker() {
  var myLatlng = new google.maps.LatLng(startLat, startLng);
  var markerOptions = {
    zoom: 15,
    center: myLatlng
  };
  // var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var marker = new google.maps.Marker({
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: myLatlng,
    
  });


  // To add the marker to the map, call setMap();
  marker.setMap(map);
  // Event listener for click on the marker to invoke bouncing animation on marker
  // google.maps.event.addListener(marker, 'click', toggleBounce);
  // Event listener to load Places results
  // google.maps.event.addListener(marker, "dblclick", initPlaces);

  google.maps.event.addListener(map, 'click', function(event) {
    clickAddMarker(event.latLng);
  });

}



// var map;
// function initialize() {
//   var mapOptions = {
//     zoom: 8,
//     center: new google.maps.LatLng(-34.397, 150.644)
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
// }

// google.maps.event.addDomListener(window, 'load', initialize);










// function initialize() {
//   var rendererOptions = {
//     draggable: true
//   };
//   var mapOptions = {
//     center: new google.maps.LatLng(-34.397, 150.644),
//     panControl: true,
//     zoomControl: true,
//     mapTypeControl: true,
//     scaleControl: true,
//     streetViewControl: true,
//     overviewMapControl: true,
//     zoom: 8
//   };
//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//             mapOptions);
//   }
//   google.maps.event.addDomListener(window, 'load', initialize);








// function addMarker() {
//   var myLatlng = new google.maps.LatLng(startLat, startLng);
//   var mapOptions = {
//     zoom: 12,
//     center: myLatlng
//   };
//   // var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//   var marker = new google.maps.Marker({
//     draggable: true,
//     animation: google.maps.Animation.DROP,
//     position: myLatlng,
//   });
 


//   // To add the marker to the map, call setMap();
//   marker.setMap(map);
//   // Event listener for click on the marker to invoke bouncing animation on marker
//   google.maps.event.addListener(marker, 'click', toggleBounce);
//   // Event listener to load Places results
//   google.maps.event.addListener(marker, "dblclick", initPlaces);

//   google.maps.event.addListener(map, 'click', function(event) {
//     clickAddMarker(event.latLng);
// });
// }







