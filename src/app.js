/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var ajax = require('ajax');
Accel.init();

setTimeout(function main(){
  console.log("test");
  Accel.on('data', function(e) {
    console.log('Just received ' + e.samples + ' from the accelerometer.');
  });
},3000)