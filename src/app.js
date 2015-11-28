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
var wind = new UI.Window({ fullscreen: true });
var image = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  image: 'images/lion.png'
});
wind.add(image);
wind.show();
function dataHandler(data){
	var accelSum = {x:data.accel.x,y:data.accel.y,z:data.accel.z};
	var jerkSum = {x:0,y:0,z:0}
	var lastAccel = data.accel;
	for (var i = 1; i < data.samples; i++) {
		accelSum.x += data.accels[i].x;
		accelSum.y += data.accels[i].y;
		accelSum.z += data.accels[i].z;
		jerkSum.x += lastAccel.x - data.accels[i].x;
		jerkSum.y += lastAccel.y - data.accels[i].y;
		jerkSum.z += lastAccel.z - data.accels[i].z;
		lastAccel = data.accels[i];
	};
	ajax(
		{
			url: 'http://ianisabitch.xyz/data',
			method: 'POST',
			type: 'json',
			data: {accel:accelSum, jerk:jerkSum}
		},
		function(data, status, request) {
			console.log('Quote of the day is: ' + data);
		},
		function(error, status, request) {
			console.log('The ajax request failed: ' + error);
		}
	);
}
Accel.on("data",dataHandler);