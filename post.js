const fetch = require("node-fetch");
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
        ping_delay: 6,
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

getData(url);