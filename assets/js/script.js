var WeatherDisplayEl = document.querySelector("#city-search-container")
var cityNameEl = document.querySelector("#city-name")
// var dateTodayEL = $("#date-today")
// var weatherTodayEl = $("weather-today")
// var tempTodayEl = $("#temp-today")
// var windTodayEl = $("#wind-today")
// var humidityTodayEl = $("#wind-today")
// var uvTodayEl = $("#uv-today")

var apikey = "bde2fddb9d1baf4bcf15398e8a8d6454"




var getCityGeocoding = function (inputCityVal) {
    // use api to search city weather and save it on variable to fetch
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCityVal + "&appid=" + apikey;
    // fetch data from api URL
    fetch(apiUrl).then( function(response) {
        // check if succesfull api request
        if (response.ok) {
            response.json().then( function(data) {
                console.log("City Geocoding data = ", data)
                getCitySearch(data.coord.lon, data.coord.lat);
                saveSearchHistory(inputCityVal);
                // $("#city").val("");
            })

        } else {
            alert("Error")

        }
    })

};


var getCitySearch = function(lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    fetch(apiUrl).then( function(response) {
        if(response.ok) {
            response.json().then(function (data) {

                console.log("City Search data = ", data)
                displayCurrentW(data.current);
                // displayForecastW(data.daily);

            })
        }
    })

};

var displayCurrentW = function(current) {
    // reset city-search-container html
    var citySearchContainer = document.querySelector("#city-search-container")
    // citySearchContainer.innerHTML = ""

    // fetch weather icon
    var weatherIcon = "https://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png"

    // display info to element variables

    //Create Date today h3 --- add text content from moment --- append to weatherDisplayEl
    var dateTodayEL = document.createElement("h3")
    dateTodayEL.textContent = "Date: " + moment().format("MM/DD/YYYY")
    WeatherDisplayEl.appendChild(dateTodayEL)

    //Create weather today h4 --- add inner Html --- append to weatherDisplayEl
    var weatherTodayEl = document.createElement("h4")
    weatherTodayEl.innerHTML = "Current Weather: <img src='" + weatherIcon + "' alt='weather-icon' max-width=50%/> " + current.weather[0].description
    WeatherDisplayEl.appendChild(weatherTodayEl)

    //Create temp today h4 --- add text content --- append to weatherDisplayEl
    var tempTodayEl = document.createElement("h4")
    tempTodayEl.textContent = "Temp: " + current.temp + " °F";
    WeatherDisplayEl.appendChild(tempTodayEl)




    
    // dateTodayEL = 
    // weatherTodayEl = $("weather-today")
    // tempTodayEl = $("#temp-today")
    // windTodayEl = $("#wind-today")
    // humidityTodayEl = $("#wind-today")
    // uvTodayEl = $("#uv-today")





}










var saveSearchHistory = function() {

};


// START FUNCTION USING JQUERY
$(document).on('click','.searchBtn', function() {
    // save city input value in variable by looking for id of input and grabbing value
    var inputCityVal = $("#citySearch").val();
    // display search city in weather container
    console.log(cityNameEl)
    cityNameEl.textContent= inputCityVal
    


    getCityGeocoding(inputCityVal)

})

