const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const today = document.querySelector('.day');
const todaysDate = document.querySelector('.date');
const digitalClock = document.querySelector('.digital');
var timePicker = document.querySelector('.customTime');

const alarmSound = new Audio();
alarmSound.src = './src/audio/alarm.mp3';
var alarmTimer;
var seconds, mins, hours, day, date, month, year;

var startTime= new Date();

function setTime() {
  const now = new Date();
  var custom = timePicker.valueAsNumber;
  var customTime = new Date(custom);
  var diff = now - startTime;
  customTime.setMilliseconds(customTime.getMilliseconds() + diff);

  if (isNaN(custom)) {
    seconds = now.getUTCSeconds();
    mins = now.getUTCMinutes();
    hours = now.getUTCHours();
    day = now.getDay();
    date = now.getUTCDate();
    month = now.getUTCMonth();
    year = now.getUTCFullYear();
  } else {

    seconds = customTime.getSeconds();
    mins = customTime.getMinutes();
    hours = customTime.getHours();
    day = customTime.getDay();
    date = customTime.getDate();
    month = customTime.getMonth();
    year = customTime.getFullYear();
  }

  var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];

  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  mins = (mins < 10) ? `0${mins}` : mins;
  hours = (hours < 10) ? `0${hours}` : hours;
  date = (date < 10) ? `0${date}` : date;
  month = (month < 10) ? `0${month + 1}` : month + 1;

  digitalClock.innerHTML = `${hours} : ${mins} : ${seconds}`;
  todaysDate.innerHTML = `${days[day]}, ${date}-${month}-${year}`;

  secondHand.style.setProperty('transform', `rotate(${((seconds / 60) * 360) + 180}deg)`);
  minsHand.style.setProperty('transform', `rotate(${((mins / 60) * 360) + 180}deg)`);
  hourHand.style.setProperty('transform', `rotate(${((hours / 12) * 360) + ((mins / 60) * 30) + 180}deg)`);

  if(seconds==0){
    secondHand.style.transitionDuration = '0s';
    minsHand.style.transitionDuration = '0s';
    hourHand.style.transitionDuration = '0s';
  } else {
    secondHand.style.transitionDuration = '0.05s';
    minsHand.style.transitionDuration = '0.05s';
    hourHand.style.transitionDuration = '0.05s';﻿
  }

}

function resetTime() {
  timePicker.value = '';
}

function setAlarm(button) {
  var ms = document.querySelector('.alarmTime').valueAsNumber;
  if(isNaN(ms)){
    alert('Invalid date!');
    return;
  }

  var alarm  = new Date(ms);
  var alarmTime = new Date(alarm.getFullYear(), alarm.getMonth(), alarm.getDate(), alarm.getHours(), alarm.getMinutes(), alarm.getSeconds());
  var custom = timePicker.valueAsNumber;
  if (isNaN(custom)) {
    var diff = alarmTime.getTime() - (new Date()).getTime();
  }
  else{
    var diff = alarmTime.getTime() - (new Date(custom)).getTime();
  }

  if (diff < 0) {
    alert('Time already passed!');
    return;
  }

  alarmTimer = setTimeout(initAlarm, diff);
  button.innerText ='cancel alarm';
  button.setAttribute('onclick', 'cancelAlarm(this);');
}

function cancelAlarm(button) {
  button.innerText = 'set alarm';
  button.setAttribute('onclick', 'setAlarm(this);');
  clearTimeout(alarmTimer);
}

function initAlarm(){
  alarmSound.play();
  document.querySelector('.stopButton').style.display = '';
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.curentTime = 0;
  document.querySelector('.stopButton').style.display = 'none';
  cancelAlarm(document.querySelector('.alarmButton'));
}


setInterval(setTime, 1000);
setTime();
