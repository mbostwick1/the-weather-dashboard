// console.log("oh hey!");
 
// variables //

var city = "";
var searchInput = $("#search-input");
var searchBtn = $("#search-btn");
var userCity=[];
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity= $("#humidity");
var currentWindSpeed=$("#wind-speed");
var currentUVIndex= $("#uv-index");

// CITY SEARCH //
function searchCity(x){
    for (var i = 0; i < userCity.length; i++){
        if( x.toLowerCase() === userCity[i]){
            return -1;
        }
    }
    return 1;
}

// API KEY //
 var APIKey = "a0aca8a89948154a4182dcecc780b513";

// Show weather data //

function showWeather(event){
    event.preventDefault();
    if( searchInput.val().trim() !== ""){
        city = searchInput.val().trim();
        getWeather(city);
    }
}

// Get current city weather data: current date, temperature, humidity, wind speed, and UV Index //
function getWeather(city) {

 // Here we are building the URL we need to query the database
 var queryURL =
   "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

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
searchBtn.on("click", showWeather);
