async function main() {
  var http = require("http");
  var fs = require("fs");
  var monitoring = require("./monitoring");

  var jsonData = JSON.parse(fs.readFileSync("manager.conf", "utf8"));

  var opcoes = {
    hostname: jsonData.brokerAddress,
    port: jsonData.brokerPort,
    path: "/v2/entities/" + jsonData.monitoringEntity,
    hostname: "177.104.61.60",
    port: 1026,
    json: true,
    headers: {
      Accept: "application/json",
      "fiware-service": "openiot",
      "fiware-service-path": "/"
    }
  };

  var response = [];
  var jsonResponse = {};

  var req = http.request(opcoes, function(res) {
    res.on("data", function(pedaco) {
      response.push(pedaco);
    });
    res.on("end", function(res) {
      jsonResponse = JSON.parse(response);

      monitoring.start(jsonResponse);
    });
  });

  req.end();
}

var url = "http://177.104.61.60:1026/v2/entities/urn:ngsi-ld:FiwareOrion/attrs?options=keyValues";
     //url = "http://177.104.61.60:1026/v2/entities/urn:ngsi-ld:FiwareOrion";
const getData = async url => {
  try {
    
    var headers = {
           
            
       "Content-Type": "application/json" ,
          "fiware-service": "openiot",
          "fiware-service-path": "/"
          
        
        }
    var data ={
           
        available:  true,
        ping_delay: 5,
        ping_status: true,
        timestamp:  12345674000
      }
    const response = await fetch(url,{method:'POST',headers:headers,body: JSON.stringify(data)});
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};