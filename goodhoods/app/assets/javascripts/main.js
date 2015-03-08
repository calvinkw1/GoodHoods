$(document).ready(function() {
  
  $("form").submit(function(e) {
    e.preventDefault();
    var city = $("#city").val();
    var state = $("#state").val();
    var url = "/search";
    $.getJSON(url, {city:city, state:state}, function(data) {
      charts = data.demographics.response.charts;
      $("div").append("<h5>" + charts.chart[0].name + "</h5>");
      $("div").append("<div><img src=" + charts.chart[0].url + "></div>");
      console.log(charts);
    });
  });



});