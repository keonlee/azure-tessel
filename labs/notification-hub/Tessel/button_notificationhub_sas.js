// The MIT License (MIT)

// Copyright (c) 2014 Microsoft DX TED EMEA

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


// NotificationHub Parameters
var NotificationHubNS = '<your ServiceBus namespace>.servicebus.windows.net'
var hubName = '<Your hub name>'; 
var Key = '<Your SAS Key generated by the SAS tool>';


var tessel = require('tessel');
var https = require('https');

var delay = 1000; //ms
var buffer = '';

var measureInterval = setInterval(measure, delay);

tessel.button.on('press', sendNotificationAndroid);


function sendNotificationWP() {

	
    var options = {
        hostname: NotificationHubNS,
        port: 443,
        path: '/' + hubName + '/' + 'messages/' + '?api-version=2013-08',
        method: 'POST',
        headers: {
            'Authorization': Key,
            'Content-Type': 'application/xml;charset=utf-8',
            'ServiceBusNotification-Format' : 'windowsphone', 
			'X-NotificationClass': '2', 
			'X-WindowsPhone-Target': 'toast' 
        }
    };

    var req = https.request(options, function (res) {
        console.log("sendNotificationWP:statusCode: ", res.statusCode);
        console.log("sendNotificationWP:headers: ", res.headers);
		
		res.setEncoding('utf8');
        res.on('data', function (d) {
            
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });
	
	var message = 'Hello From Tessel';
	
	var toast = '<?xml version="1.0" encoding="utf-8"?><wp:Notification xmlns:wp="WPNotification"><wp:Toast><wp:Text1>' + message + '</wp:Text1></wp:Toast></wp:Notification>';   

    req.write(toast);

    req.end();


}

function sendNotificationAndroid() {

	
    var options = {
        hostname: NotificationHubNS,
        port: 443,
        path: '/' + hubName + '/' + 'messages/' + '?api-version=2013-08',
        method: 'POST',
        headers: {
            'Authorization': Key,
            'Content-Type': 'application/xml;charset=utf-8',
            'ServiceBusNotification-Format' : 'gcm', 
        }
    };

    var req = https.request(options, function (res) {
        console.log("sendNotificationAndroid:statusCode: ", res.statusCode);
        console.log("sendNotificationAndroid:headers: ", res.headers);	

		res.setEncoding('utf8');
        res.on('data', function (d) {
            
        });
    });

    req.on('error', function (e) {
        console.error(e);
    });
	
	var message = 'Hello From Tessel';
	
	var data = '{"data":{"message":"' + message + '"}}';
	
    req.write(data);

    req.end();


}


