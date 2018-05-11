const Gpio = require('onoff').Gpio;
const Sound = require('node-aplay');
const firebase = require("firebase");
const button = new Gpio(4, 'in', 'rising', {debounceTimeout: 5});
const config = {
  apiKey: "AIzaSyA2WUeu4JNV30qCHDR42hkwoga-lf-3lk0",
  authDomain: "ir-sensor-10514.firebaseapp.com",
  databaseURL: "https://ir-sensor-10514.firebaseio.com",
  projectId: "ir-sensor-10514",
  storageBucket: "ir-sensor-10514.appspot.com",
  messagingSenderId: "929767582255"
};
firebase.initializeApp(config);
// const dbRefObject = firebase.database().ref().child("sensor");
const dbRefObject = firebase.database().ref('sensor/clicks');


let sound1 = new Sound('sounds/1.wav');
let sound2 = new Sound('sounds/2.wav');
let sound3 = new Sound('sounds/3.wav');
let sound4 = new Sound('sounds/4.wav');
let sound5 = new Sound('sounds/5.wav');
let sound6 = new Sound('sounds/6.wav');
let sound7 = new Sound('sounds/7.wav');
let sound8 = new Sound('sounds/8.wav');
let sound9 = new Sound('sounds/9.wav');
let sound10 = new Sound('sounds/10.wav');
let sounds = [sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9, sound10];

button.watch(function (err, value) {
  let randomSound = sounds[Math.floor(Math.random()*sounds.length)];
  console.log(value);
  if(value) {
    randomSound.play();
    dbRefObject.transaction(function(currentClicks) {
      return (currentClicks || 0) + 1;
    });
  }
});
