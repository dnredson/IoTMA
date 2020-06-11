

 const publish = async (host,result,id) => {
     
    try {
        url = "http://177.104.61.60:1026/v2/entities/urn:ngsi-ld:FiwareOrion/attrs?options=keyValues";
      var headers = {
             
              
         "Content-Type": "application/json" ,
            "fiware-service": "openiot",
            "fiware-service-path": "/"
            
          
          }
      var data ={
             
          available:  true,
          ping_delay: 7,
          ping_status: true,
          timestamp:  12345674999
        }
      const response = await fetch(url,{method:'POST',headers:headers,body: JSON.stringify(data)});
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  
  Promise.all([publish()])
        .then(function(result1) {
          
                  
          console.log(result1);
          
          
         
        })
        .catch(err => {
          console.log(err);
        });