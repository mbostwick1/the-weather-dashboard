// console.log("oh hey!");
 
// variables //

var city = "";
var searchInput = $("#search-input");
var searchBtn = $("#search-btn");


function init() {}

// API KEY //
 var APIKey = "6c462ba73204a6931ad191705428066";

// Get current city weather data: current date, temperature, humidity, wind speed, and UV Index //
function getWeather() {


 // Here we are building the URL we need to query the database
 var queryURL =
   "https://api.openweathermap.org/data/2.5/weather?q=" +
   city + "&appid="
   APIKey +
   "&units=imperial";

// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
 
}

//Get 5 day forecast for current city: date, weather icon, temperature, and humidity //

// Clear weather data upon new search //

// Save location searches local storage //

// Search button/function //

