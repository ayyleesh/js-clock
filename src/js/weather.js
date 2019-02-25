window.addEventListener("load", () => {
  var long;
  var lat;

  const temp = document.querySelector('.temp');

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "http://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/037712230405346e2232e500f0022fdb/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data =>{
          console.log(data);
          celcius = 5/9*(data.currently.temperature - 32);
          temp.innerHTML = `${celcius.toFixed(1)}°C`;
          icon = data.currently.icon;
          setIcons(icon, document.querySelector('.icon'));
        })
        document.querySelector('.no-location').style.display = 'none';
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "#00f2c3"});
    const currentIcons = icon.replace(/-/g, "_").toUpperCase();
    skycons.pause();
    return skycons.set(iconID, Skycons[currentIcons]);
    console.log(currentIcons);
  }
});
