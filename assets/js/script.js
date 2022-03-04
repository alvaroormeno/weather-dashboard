var WeatherDisplayEl = document.querySelector("#city-search-container")
var forecastDisplayEl = document.querySelector("#forecast-result")
var forecastTitleEl = document.querySelector("#forecast-title")
var cityNameEl = document.querySelector("#city-name")
var startbtnEl = document.querySelector(".searchBtn")
var historyContainerEl = document.querySelector("#history-container")
var historyButtonEl = document.querySelector(".history-btn")
var searchHistory = [];


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
                displayForecastW(data.daily);

            })
        }
    })

};

var displayCurrentW = function(current) {
    // reset city-search-container html
    WeatherDisplayEl.innerHTML = ""

    // fetch weather icon
    var weatherIcon = "https://openweathermap.org/img/wn/" + current.weather[0].icon + "@2x.png"

    //Create Date today h3 --- add text content from moment --- append to weatherDisplayEl
    var dateTodayEL = document.createElement("h3")
    dateTodayEL.textContent = "Date: " + moment().format("MM/DD/YYYY")
    WeatherDisplayEl.appendChild(dateTodayEL)

    //Create weather today h4 --- add inner Html --- append to weatherDisplayEl
    var weatherTodayEl = document.createElement("h4")
    weatherTodayEl.innerHTML = "Current Weather: <img src='" + weatherIcon + "' alt='weather-icon' width='50' height='50'/> " + current.weather[0].description
    WeatherDisplayEl.appendChild(weatherTodayEl)

    //Create temp today h4 --- add text content --- append to weatherDisplayEl
    var tempTodayEl = document.createElement("h4")
    tempTodayEl.textContent = "Temp: " + current.temp + " °F";
    WeatherDisplayEl.appendChild(tempTodayEl)

    //Create wind today h4 --- add text content --- append to weatherDisplayEl
    var windTodayEl = document.createElement("h4")
    windTodayEl.textContent = "Wind: " + current.wind_speed + " MPH";
    WeatherDisplayEl.appendChild(windTodayEl)

    //Create humidity today h4 --- add text content --- append to weatherDisplayEl
    var humidityTodayEl = document.createElement("h4")
    humidityTodayEl.textContent = "Humidity: " + current.humidity + " %";
    WeatherDisplayEl.appendChild(humidityTodayEl)

    //Create uv today h4 
    var uvTodayEl = document.createElement("h4")
    uvTodayEl.textContent = "UV Index: ";

    //Create uvIndex span --- add text content
    var uvIndex = document.createElement("span");
    uvIndex.textContent = current.uvi;
    // append uvIndex next to uvToday
    uvTodayEl.appendChild(uvIndex)
    // add class to change color depending on uv number 
    if (current.uvi < 2) {
        uvIndex.className = "low-uv"
    } else if (current.uvi >= 2 && current.uvi < 6) {
        uvIndex.className = "medium-uv"
    } else {
        uvIndex.className = "high-uv"
    }
    // append uvToday to WeatherDisplayeL
    WeatherDisplayEl.appendChild(uvTodayEl)
    
};

var displayForecastW = function(daily) {

    forecastDisplayEl.innerHTML = ""

    // display five day forecast title
    forecastTitleEl.textContent = "- Five Day Forecast -"

    // for loop to display 5 times
    for (var i = 0; i < 5; i++) {

        var forecastIcon = "https://openweathermap.org/img/wn/" + daily[i].weather[0].icon + ".png"

        var forecastCardEl = document.createElement("div");

        forecastCardEl.className = "card text-center align-items-center m-3 border border-dark border-3";
        forecastDisplayEl.appendChild(forecastCardEl)

        var forecastDateEl = document.createElement("h4");
        forecastDateEl.textContent = moment().add((i + 1), 'd').format("MM/DD/YY");
        forecastCardEl.appendChild(forecastDateEl)

        var forecastImgEl = document.createElement("img");
        forecastImgEl.className = "forecast-image"
        forecastImgEl.src = forecastIcon;
        forecastCardEl.appendChild(forecastImgEl)

        var ImgDescriptionEl = document.createElement("h4");
        ImgDescriptionEl.textContent = daily[i].weather[0].description;
        forecastCardEl.appendChild(ImgDescriptionEl)

        var forecastTempEl = document.createElement("h4");
        forecastTempEl.textContent = "Temp: " + daily[i].temp.day + " °F";
        forecastCardEl.appendChild(forecastTempEl)

        var forecastWindEl = document.createElement("h4");
        forecastWindEl.textContent = "Wind: " + daily[i].wind_speed + " MPH";
        forecastCardEl.appendChild(forecastWindEl)

        var forecastHumEl = document.createElement("h4");
        forecastHumEl.textContent = "Humidity: " + daily[i].humidity + " %";
        forecastCardEl.appendChild(forecastHumEl)

    };

};

function saveSearchHistory(inputCityVal) {
    if (!(searchHistory.indexOf(inputCityVal) > -1)) {
        searchHistory.push(inputCityVal);
    }

    localStorage.setItem("search", JSON.stringify(searchHistory));
};

function getSearchHistory() {
    var history = localStorage.getItem("search");
    history = JSON.parse(history);
    for (x in history) {
        searchHistory.push(history[x]);
        SearchHistoryBtn(history[x]);
        console.log(SearchHistoryBtn)
    }
};

function SearchHistoryBtn(cityName) {
    var buttonEl = document.createElement("button");
    buttonEl.className = "btn btn-secondary history-btn m-1";
    buttonEl.textContent = cityName;
    buttonEl.setAttribute("data-search", cityName);
    buttonEl.setAttribute("onclick", "searchThisHistory(getAttribute('data-search'))");
    historyContainerEl.append(buttonEl);
};

function clearHistory() {
    localStorage.clear();
    location.reload();
};

var searchThisHistory = function(value) {
    console.log("works!")
    // var searchThis = historyButtonEl.getAttribute("data-search")
    console.log(value)
    cityNameEl.textContent= value
    getCityGeocoding(value)

};

var startApp = function() {

    var inputCityVal = $("#citySearch").val().trim().toUpperCase();

    console.log(cityNameEl)
    cityNameEl.textContent= inputCityVal

    getCityGeocoding(inputCityVal)
    SearchHistoryBtn(inputCityVal);

};

startbtnEl.addEventListener("click", startApp);

getSearchHistory()
