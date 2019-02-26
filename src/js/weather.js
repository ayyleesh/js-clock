window.addEventListener("load", () => {
  var long;
  var lat;

  const temp = document.querySelector('.temp');

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0cbe3f02f790bc9891bb444de79f81d6`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data =>{
          celcius = data.main.temp-273;
          temp.innerHTML = `${celcius.toFixed(1)}°C`;
          icon = data.weather[0].id;
          document.querySelector('.icon').innerHTML = `<i class="owf owf-${icon} owf-2x"></i>`;
        })
        document.querySelector('.no-location').style.display = 'none';
    });
  }
});
