$(document).ready(function() {
  
  $("form").submit(function(e) {
    e.preventDefault();
    var city = $("#city").val();
    var state = $("#state").val();
    var url = "/search";
    $.getJSON(url, {city:city, state:state}, function(data) {
      // for (i = 0; i < data.length; i++) {
      charts = data.demographics.response.charts;
        $("ul").append("<div><img src=" + charts.chart[0].url + "></div>");
        // charts.chart[0].url
        console.log(charts);
        // $("ul").append("<li>data[i]</li>");
      // }
    });
  });



});