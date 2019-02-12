const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const today = document.querySelector('.day');
const todaysDate = document.querySelector('.date');
const digitalClock = document.querySelector('.digital');

function setTime() {
  const now = new Date();

  var seconds = now.getUTCSeconds();
  var mins = now.getUTCMinutes();
  var hours = now.getUTCHours();
  var date = now.getDate();
  var month = now.getMonth();

  var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  mins = (mins < 10) ? `0${mins}` : mins;
  hours = (hours < 10) ? `0${hours}` : hours;
  date = (date < 10) ? `0${date}` : date;
  month = (date < 10) ? `0${month + 1}` : month + 1;

  digitalClock.innerHTML = `${hours} : ${mins} : ${seconds}`;
  todaysDate.innerHTML = `${days[now.getDay()]}, ${date}-${month}-${now.getFullYear()}`;

  secondHand.style.setProperty('transform', `rotate(${((seconds / 60) * 360) + 90}deg)`);
  minsHand.style.setProperty('transform', `rotate(${((mins / 60) * 360) + 90}deg)`);
  hourHand.style.setProperty('transform', `rotate(${((hours / 12) * 360) + 90}deg)`);

  if(seconds==0){
    secondHand.style.transitionDuration = '0s';
    minuteHand.style.transitionDuration = '0s';
    hourHand.style.transitionDuration = '0s';
  } else {
    secondHand.style.transitionDuration = '0.05s';
    minuteHand.style.transitionDuration = '0.05s';
    hourHand.style.transitionDuration = '0.05s';﻿
  }

}

setInterval(setTime, 1000);
setTime();
