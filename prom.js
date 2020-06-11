async function ping(host) {
  var ping = require("ping");
  var host = "www.google.com.br";
  var resposta = await ping.promise.probe(host).then(function(res) {
    
    console.log(res.avg);
    console.log(res.alive);
    return res;
  });
  return resposta;
}
async function available(host, port) {}
const fetch = require("node-fetch");
var url = "http://177.104.61.17:1026/version";

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};

const checkAPI = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};

const checkQL = async url => {
  try {
    url = url + "/v2/version";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};

const checkCrateDb = async url => {
  try {
    url = url;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};
const checkOrion = async url => {
  try {
    url = url + "/version";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};

const checkIoTAgent = async url => {
  try {
    url = url + "/iot/devices";
    const response = await fetch(url);
    const json = await response.json();
    if (json.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
    console.log(error);
  }
};

const mqtt = async url => {
  try {
    var response = await initialize(url);

    return response;
  } catch (error) {
    return error;
    console.log(error);
  }
};
function initialize(url) {
  return (teste = new Promise(function(resolve, reject) {
    var mqtt = require("mqtt");
    var client = mqtt.connect("mqtt://" + url);

    var status;
    client.on("error", function(error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("disconnect", function(error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("reject", function(error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("close", function(error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("connect", function() {
      client.end();
      status = true;
      resolve(status);
    });
  }));
}

/*
const getData = async url => {
fetch(url, {method: "GET",
                headers: { "fiware-service": "openiot", "fiware-servicepath": "/"}
    })
    .then(res => res.json())
    .then(json => console.log(json));
  }
/* getData(url).then(content=>{
    console.log("Tá available essa porra?");
    console.log(content.orion.version);

}).catch(err=>{console.error(err);});
 */
function testMongo(url) {
  return (teste = new Promise(function(resolve, reject) {
    var mongoose = require("mongoose");
    var mongoDB = url;
    mongoose.connect(mongoDB);
    mongoose.connection.on("connected", function() {
      mongoose.connection.close();

      resolve(true);
    });

    mongoose.connection.on("error", function(err) {
      mongoose.connection.close();

      resolve(false);
    });
  }));
}

const mongo = async url => {
  try {
    var response = await testMongo(url);
console.log(response);
    return response;
  } catch (error) {
    return error;
    console.log(error);
  }
};
function checkAll (url) {
  url = "mongodb://177.104.61.60";
  Promise.all([mongo(url)])
    .then(function(result1) {
      console.log("result1");
      console.log(result1)
      return result1;
    })
    .catch(err => {
      console.log(err);
    });
};

checkAll();