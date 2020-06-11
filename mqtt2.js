
function initialize() {
    return teste = new Promise(function(resolve, reject) {
        var url = "177.104.61.27:1883";
        var mqtt    = require('mqtt');
        var client  = mqtt.connect('mqtt://'+url);
        
        var status;
        client.on("error", function(error) {
            client.end();
            status = "offline";
            reject(status);
        });
        
        client.on('offline', function() {
            
            client.end();
            status = "offline";
            reject(status);
        });
        
        client.on('connect', function () {
                        
            client.end();
            status = "online";
            resolve(status);
            });
        
    })
}



Promise.all([initialize()]).then(function(result1){
    console.log("result1");  
    console.log(result1);
   
  }).catch(err=>{console.log(err);})