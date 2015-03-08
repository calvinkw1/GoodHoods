$(document).ready(function() {
  
  $("form").submit(function(e) {
    e.preventDefault();
    $("#charts").empty();
    var city = $("#city").val();
    var state = $("#state").val();
    var url = "/search";
    $.getJSON(url, {city:city, state:state}, function(data) {
      charts = data.demographics.response.charts.chart;
      for (i = 0; i < charts.length; i++) {
        $("#charts").append("<h5>" + charts[i].name + "</h5>");
        $("#charts").append("<div><img src=" + charts[i].url + "></div>");
      }
      console.log(charts);
    });
  });



});