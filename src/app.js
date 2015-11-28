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
var main = new UI.Card({
  title: 'Virtual Pebble',
  icon: 'images/lion.png',
  subtitle: 'Welcome',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  Accel.on('data', function(e) {
    for( var accelIndex in e.accels ){
      console.log("x:"+e.accels[accelIndex].x);
      console.log("y:"+e.accels[accelIndex].y);
      console.log("z:"+e.accels[accelIndex].z);
      console.log("time:"+e.accels[accelIndex].time);
    }
  });
});