// Hamburger
var hamburger = document.querySelector('.hamburger');
var menu = document.querySelector('.menu');
var header = document.querySelector('header');

hamburger.addEventListener('click',toggleMenu);
var clickRecord = 0;
function toggleMenu(){
  if(clickRecord === 0){
    menu.classList.remove('none');
    menu.classList.add('block');
    header.style.cssText = "height: 420px;"
    clickRecord = 1;
  } else {
    menu.classList.remove('block');
    menu.classList.add('none');
    header.style.cssText = "height: auto;"
    clickRecord = 0;
  } 
}

// Ajax call.
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
uiFindBtn.addEventListener('click', validate);

makeRequest();
function makeRequest(e){
  if(e) e.preventDefault();
  uiFindBtn.parentNode.classList.remove('error-name'); // Remove error message.
  var uiUserInput = document.querySelector('.search-weather form input').value || "Mumbai";
  var xmlObj = new XMLHttpRequest();
  xmlObj.open('GET','https://api.openweathermap.org/data/2.5/weather?q=' + uiUserInput + '&appid=' + apiKey);
  xmlObj.onload = handleRequest; // This function handle the request.
  xmlObj.send();

  function handleRequest() {
    var dateTime = new Date();
    if (xmlObj.status === 200) {
      var response = JSON.parse(xmlObj.responseText);
  
      uiDateTime.children[0].textContent = dateTime.toLocaleString('default', {weekday:'long'}); // Insert all response in UI.
      uiDateTime.children[1].textContent = dateTime.getDate() + " " + dateTime.toLocaleString('default', {month:'short'});
      uiCityName.textContent = response.name;
      uiTemp.textContent = Math.round(response.main.temp - 273.15) + "\u00B0" + "c";
      uiHumidity.textContent = response.main.humidity + "%";
      uiAirSpeed.textContent = Math.round(response.wind.speed * 3.6) + "km/h";
      uiDirection.textContent = response.wind.deg;
      var weatherIcon = response.weather[0].main;
  
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
      uiFindBtn.parentNode.classList.add('error-name'); // Show error message to user.
    }
  }
}

function validate(e){
  e.preventDefault();
  uiFindBtn.parentNode.classList.remove('error-name');
  var uiUserInput = document.querySelector('.search-weather form input').value;
  var regex = /^[a-zA-Z]{2,12}$/; 
  uiUserInput === "" ? uiFindBtn.parentNode.classList.add('error-null') : uiFindBtn.parentNode.classList.remove('error-null');
}