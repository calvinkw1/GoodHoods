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

  $.getJSON('/californiaZillow.json', function(hoods) {
  console.log(hoods);
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
}

google.maps.event.addDomListener(window, 'load', initialize);




  $(document).ready(function(){
    
// function searchBox() {  
   console.log($("#search_input").toArray());
  $("#search_input").on("submit", function(e) {

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
              
    }); 
  });
});
        //   var mapOptions = {
        //   center: new google.maps.LatLng (Lat, Lng),
        //   zoom: 13,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        // }
        // var myLatlng = new google.maps.LatLng(Lat, Lng);
        //  // var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        //  console.log(map);
   
      
    
      // var myLatlng = new google.maps.LatLng(Lat, Lng);
      // // map.setCenter(new google.maps.LatLng(Lat , Lng));
      // var mapOptions = {
      // zoom: 15,
      // center: new google.maps.LatLng(33.33 , -33.33),
      // };
      // var marker = new google.maps.Marker({
      //   draggable: true,
      //   animation: google.maps.Animation.DROP,
      //   position: myLatlng
    
      // });
      //  marker.setMap(map);



 // map.setCenter(new google.maps.LatLng(Lat,Lng));
      // map.setZoom(15);
      // map.addMarker({
      //   lat: LatLng.Lat(),
      //   lng: LatLng.Lng()
      // });
      // console.log(Lat);
      // // myLatlng = new google.maps.LatLng(lat, lng);
      // // };
      // new google.maps.Map(Lat, Lng);
      //     moveToLocation();
      // addMarker(); // calling function to drop marker on map





// }
// searchBox();


// function moveToLocation() {
//   // var myLatlng = new google.maps.LatLng(lat, lng);
// console.log(Lat);
//    map.setCenter(new google.maps.LatLng(lat, lng));
//    map.setZoom(15);

//   new google.maps.LatLng(Lat, Lng);
//   var mapOptions = {
//     zoom: 15,
//     center: myLatlng
//   };
// }












































// var input = (document.getElementById('search-input'));
//   input = new google.maps.LatLng(Lat, Lng);
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);





  //COMMENTED OUT IN ORDER TO REPURPOSE FROM ZILLOW API CALL TO MAP SEARCHING
  // $("form").submit(function(e) {
  //   e.preventDefault();
  //   $("#charts").empty();
  //   var city = $("#city").val();
  //   var state = $("#state").val();
  //   var url = "/search";
  //   $.getJSON(url, {city:city, state:state}, function(data) {
  //     charts = data.demographics.response.charts.chart;
  //     for (i = 0; i < charts.length; i++) {
  //       $("#charts").append("<h5>" + charts[i].name + "</h5>");
  //       $("#charts").append("<div><img src=" + charts[i].url + "></div>");
  //     }
  //     console.log(charts);
  //   });
  // });












