// console.log("oh hey!");

// variables //

var city = "";
var searchInput = $("#search-input");
var searchBtn = $("#search-btn");
var userCity = [];
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUVIndex = $("#uv-index");

// CITY SEARCH //
function searchCity(x) {
  for (var i = 0; i < userCity.length; i++) {
    if (x.toLowerCase() === userCity[i]) {
      return -1;
    }
  }
  return 1;
}

// API KEY //
var APIKey = "a0aca8a89948154a4182dcecc780b513";

// Show weather data //

function showWeather(event) {
  event.preventDefault();
  if (searchInput.val().trim() !== "") {
    city = searchInput.val().trim();
    getWeather(city);
  }
}

// Get current city weather data: current date, temperature, humidity, wind speed, and UV Index //
function getWeather(city) {
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // weather icons //
    var weatherIcon = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

    // date display //
    var date = new Date(response.dt * 1000).toLocaleDateString();
    currentCity.html(
      response.name + " (" + date + ")" + "<img src=" + iconURL + ">"
    );

    // temperature //
    currentTemp.html(response.main.temp + " °F");

    // humidity //
    currentHumidity.html(response.main.humidity + "%");

    // wind speed//
    currentWindSpeed.html(response.wind.speed + " MPH");

    // UV Index //
    showUVIndex(response.coord.lon, response.coord.lat);

    // Forecast //
    forecast(response.id);
    
    if (response.cod == 200) {
      userCity = JSON.parse(localStorage.getItem("storedCity"));
      console.log(userCity);
      if (userCity == null) {
        userCity = [];
        userCity.push(city.toLowerCase());
        localStorage.setItem("storedCity", JSON.stringify(userCity));
        searchList(city);
      } else {
        if (find(city) > 0) {
          userCity.push(city.toLowerCase());
          localStorage.setItem("storedCity", JSON.stringify(userCity));
          searchList(city);
        }
      }
    }



  });
}

// Function for UVIndex response //

function showUVIndex(ln, lt) {
  // UVIndex URL
  var uVIndexURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;

  // AJAX call
  $.ajax({
    url: uVIndexURL,
    method: "GET",
  }).then(function (response) {
    currentUVIndex.html(" " + response.value);
    currentUVIndex.css( "background", "#C20C0C").css('color', 'white').css('padding', '5px').css('border-radius', '4px');
  });
}

//Get 5 day forecast for current city: date, weather icon, temperature, and humidity //

function forecast(city){

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey +
    "&units=imperial";
     
    // AJAX call //
    $.ajax({
        url: forecastURL,
        method:"GET"
    }).then(function(response){
        
        for (i = 0; i < 5; i++){
            var date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var weatherIcon = response.list[((i+1)*8)-1].weather[0].icon;
            var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

            var temp= response.list[((i+1)*8)-1].main.temp.toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#forDate" + i).html(date);
            $("#forIcon" + i).html("<img src=" + iconURL + ">");
            $("#forTemp" + i).html(temp);
            $("#forHumid" + i).html(humidity + "%");
        }
        
    });
}

// Save location searches local storage //

function searchList(cities){
    var listEl= $("<li>"+cities.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",cities.toUpperCase());
    $(".city-list").append(listEl);
}

// Previous searches and display //

function previousSearch(event){
    var liEl = event.target;
    if (event.target.matches("li")){
        city = liEl.textContent.trim();
        getWeather(city);
    }

}

function loadPrevious(){
    $("ul").empty();
    var userCity = JSON.parse(localStorage.getItem("storedCity"));
    if(userCity !== null){
        userCity = JSON.parse(localStorage.getItem("storedCity"));
        for(i = 0; i < userCity.length; i++) {
            searchList(userCity[i]);
        }
        city = userCity[i-1];
        getWeather(city);
    }

}

// Search button/function //
searchBtn.on("click", showWeather);

// Load handlers //
$(document).on("click", previousSearch);
$(window).on("load", loadPrevious);