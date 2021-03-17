var apiKey = '5a23d8283cd00609e5130d95f233af52'; // Stored api key.

var uiDateTime = document.querySelector('.date-time');
var uiCityName = document.querySelector('.city-name');
var uiTemp = document.querySelector('.temp-info h2');
var uiHumidity = document.querySelector('.humidity');
var uiAirSpeed = document.querySelector('.air-speed');
var uiDirection = document.querySelector('.directions');
var uiWeatherImg = document.querySelector('.temp-info figure img');
var uiFindBtn = document.querySelector('.search-weather form button');

uiFindBtn.addEventListener('click', makeRequest);
makeRequest();
function makeRequest(e){
  if(e) e.preventDefault();
  var uiUserInput = document.querySelector('.search-weather form input').value || "Mumbai";
  var xmlObj = new XMLHttpRequest();
  xmlObj.open('GET','https://api.openweathermap.org/data/2.5/weather?q=' + uiUserInput + '&appid=' + apiKey);
  xmlObj.onload = handleRequest; // This function handle the request.
  xmlObj.send();

  function handleRequest() {
    var dateTime = new Date();
    if (xmlObj.status === 200) {
      var response = JSON.parse(xmlObj.responseText);
      var day = dateTime.toLocaleString('default', {weekday:'long'});
      var date = dateTime.getDate();
      var month = dateTime.toLocaleString('default', {month:'short'});
      var responseCityName = response.name;
      var temp = Math.round(response.main.temp - 273.15);
      var humidity = response.main.humidity;
      var windSpeed = Math.round(response.wind.speed * 3.6);
      var degree = response.wind.deg;
      var weatherIcon = response.weather[0].main;
  
      uiDateTime.children[0].textContent = day; // Insert all response in UI.
      uiDateTime.children[1].textContent = date + " " + month;
      uiCityName.textContent = responseCityName;
      uiTemp.textContent = temp + "\u00B0" + "c";
      uiHumidity.textContent = humidity + "%";
      uiAirSpeed.textContent = windSpeed + "km/h";
      uiDirection.textContent = degree;
  
      switch (weatherIcon) { // Switch statement for change image depend upon weather.
        case "Drizzle":
          uiWeatherImg.src = "assets/images/icons/icon-13.svg";  
        break;
        case "Thunderstorm":
          uiWeatherImg.src = "assets/images/icons/icon-12.svg";
        break;
        case "Rain":
          uiWeatherImg.src = "assets/images/icons/icon-14.svg";
        break;
        case "Clear":
          uiWeatherImg.src = "assets/images/icons/icon-1.svg";  
        break;
        case "Broken clouds":
          uiWeatherImg.src = "assets/images/icons/icon-3.svg";
        break;
        case "Clouds":
          uiWeatherImg.src = "assets/images/icons/icon-5.svg";
        break;
        case "Mist":
          uiWeatherImg.src = "assets/images/icons/icon-7.svg";
        break;
        case "Smoke":
          uiWeatherImg.src = "assets/images/icons/icon-7.svg";
        break;
        case "Haze":
          uiWeatherImg.src = "assets/images/icons/icon-7.svg";
        break;
        default: uiWeatherImg.src = "assets/images/icons/icon-1.svg";
          break;
      }
  
    } else {
      console.log('There are problem with request please enter proper city name!');
    }
  }
}

