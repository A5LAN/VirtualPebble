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
	icon: 'resources/images/lion.png',
	subtitle: 'Welcome',
	body: 'Press any button.'
});

main.show();
function dataHandler(data){
	var accelSum = {x:data.accel.x,y:data.accel.y,z:data.accel.z};
	var lastAccel = data.accel;
	for (var i = 1; i < data.samples; i++) {
		accelSum.x += data.accels[i].x;
		accelSum.y += data.accels[i].y;
		accelSum.z += data.accels[i].z;
	};
	ajax(
		{
			url: 'http://ianisabitch.xyz/balls',
			type: 'json',
			data:accelSum
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