var mqtt = require('mqtt');


var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://177.104.61.:1883');
var status;
client.on('connect', function () {
status= true;   
console.log("Status: "+ status);
client.end();
});
client.on("error", function(error) {
    status= false;   
    console.log("ERROR: ", error);
    client.end();
});

client.on('offline', function() {
    
    client.end();
    status = false;
    console.log("Status: "+ status);
});


