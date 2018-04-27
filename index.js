const Gpio = require('onoff').Gpio;
const firebase = require("firebase");
const colors = require('colors');

const redLight = new Gpio(2, 'out');
const greenLight = new Gpio(3, 'out');
const yellowLight = new Gpio(4, 'out');
const blueLight = new Gpio(17, 'out');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA331a-6BlxnEqVb3RLC5o3EjYX2sCfzvk",
    authDomain: "simon-says-e5079.firebaseapp.com",
    databaseURL: "https://simon-says-e5079.firebaseio.com",
    projectId: "simon-says-e5079",
    storageBucket: "simon-says-e5079.appspot.com",
    messagingSenderId: "861363499770"
};
firebase.initializeApp(config);

 // Create References
const dbRefObject = firebase.database().ref().child("lights");

dbRefObject.on("value", snap => {
    let redLightRelayValue = snap.val().red_light;
    let greenLightRelayValue = snap.val().green_light;
    let yellowLightRelayValue = snap.val().yellow_light;
    let blueLightRelayValue = snap.val().blue_light;
    redLightRelayValue ? lightOn(redLight) : lightOff(redLight);
    greenLightRelayValue ? lightOn(greenLight) : lightOff(greenLight);
    yellowLightRelayValue ? lightOn(yellowLight) : lightOff(yellowLight);
    blueLightRelayValue ? lightOn(blueLight) : lightOff(blueLight);
});

function lightOn(relay){
    let stateOfLight = colors.bold.white.bgRed('ON');
    let lightName = getLightName(relay.gpio);
    relay.writeSync(0);
    console.log(''+lightName+' '+stateOfLight+'');
}

function lightOff(relay) {
    let stateOfLight = colors.bold.white.bgRed('OFF');
    let lightName = getLightName(relay.gpio);
    relay.writeSync(1);
    console.log(''+lightName+' '+stateOfLight+'');
}

function getLightName(gpioNumber) {
    let gpioLights = {
        2: function() {
            return colors.red('Red Light');
        },
        3: function() {
            return colors.green('Green Light');
        },
        4: function() {
            return colors.yellow('Yellow Light');
        },
        17: function() {
            return colors.blue('Blue Light');
        },
        'default': function() {
            return 'GPIO PIN UNKNOWN';
        }
    };
    return (gpioLights[gpioNumber] || gpioLights['default'])();

}
