const cron = require("node-cron");

function Thing(thing, interval) {
  this.thing = thing;
  this.type = thing.processtype.value;
  this.Destinyhost = thing.Destinyhost.value;
  this.entityId = thing.entityid.value;
  this.processname = thing.processname.value;
  this.serviceport = thing.port.value;
  this.samplinginterval = interval.value;
  this.host = thing.host.value;
  this.target = thing.Target.value;
}

Thing.prototype.startCheck = function () {
  var url = this.processname;
  var url2 = this.processname + ":" + this.serviceport;
  var id = this.entityId;
  console.log("URL:" + url + " Host: " + url2);
  if (this.processname.includes("orion")) {
    console.log("Checking Orion");
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/10 * * * *", function () {
      Promise.all([ping(url), checkOrion(url2)])
        .then(function (result1) {
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];
          console.log(ping_alive + " " + ping_delay + " " + available);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("API")) {
    console.log("Checking API");
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    url = this.target;
    url2 = this.target + ":" + this.serviceport;
    console.log(url);
    console.log(url3);
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), checkAPI(url2)])
        .then(function (result1) {
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];
          console.log(ping_alive + " " + ping_delay + " " + available);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("connection")) {
    console.log("Checking Connection");
    url = this.target;

    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("URL:" + url);
    console.log("\n");
    console.log("URL:3" + url3);
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = ping_alive;
          console.log(ping_alive + " " + ping_delay);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  if (
    this.processname.includes("quantumleap") ||
    this.processname.includes("quantum-leap")
  ) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), checkQL(url2)])
        .then(function (result1) {
          console.log("Starting QL" + url3 + " url " + url + " url2" + url2);

          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];
          console.log(ping_alive + " " + ping_delay + " " + available);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("mongo")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    console.log("Checking Mongo");
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), CheckMongo(url2)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          available = result1[1];
          console.log(ping_alive + " " + ping_delay + " " + available);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("crate")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), checkCrateDb(url2)])
        .then(function (result1) {
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];

          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("iot-agent")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), checkIoTAgent(url2)])
        .then(function (result1) {
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];

          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("mosquitto")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";

    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url), CheckMqtt(url2)])
        .then(function (result1) {
          console.log("Checking Mosquitto");
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;
          available = result1[1];
          console.log(ping_alive + " " + ping_delay + " " + available);
          getData2(url3, ping_alive, ping_delay, available);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("redis")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("Redis");
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          getData2(url3, ping_alive, ping_delay);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("postgresql")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("Postgres");
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          getData2(url3, ping_alive, ping_delay);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("appserver")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("AppServer");
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          getData2(url3, ping_alive, ping_delay);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("geoserver")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("Geoserver");
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          getData2(url3, ping_alive, ping_delay);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  if (this.processname.includes("gatewaybridge")) {
    var url = this.processname;
    var url2 = this.processname + ":" + this.serviceport;
    var url3 =
      "http://" + this.host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log("GWBridge");
    cron.schedule("*/1 * * * *", function () {
      Promise.all([ping(url)])
        .then(function (result1) {
          console.log(result1);
          ping_delay = result1[0].avg;
          ping_alive = result1[0].alive;

          getData2(url3, ping_alive, ping_delay);

          // publish(url2,result1,id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  if (this.processname.includes("loraserver")) {
    var temp = "loraserver-docker_loraserver_1";
    var count = (temp.match(/loraserver/g) || []).length;
    if (count >= 2) {
      var url = this.processname;
      var url2 = this.processname + ":" + this.serviceport;
      var url3 =
        "http://" +
        this.host +
        "/v2/entities/" +
        id +
        "/attrs?options=keyValues";
      console.log("LoraServer");
      cron.schedule("*/1 * * * *", function () {
        Promise.all([ping(url)])
          .then(function (result1) {
            console.log(result1);
            ping_delay = result1[0].avg;
            ping_alive = result1[0].alive;

            getData2(url3, ping_alive, ping_delay);

            // publish(url2,result1,id);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
};

Thing.prototype.getThing = function () {
  return this.processname;
};

//#Ping a host to check if the container is up
async function ping(host) {
  console.log("Pinging " + host);
  var ping = require("ping");

  console.log("Ping host:" + host);
  var resposta = await ping.promise.probe(host).then(function (res) {
    return res;
  });
  return resposta;
}

const fetch = require("node-fetch");

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
    console.log(error);
  }
};

//Check Quantum Leap container
const checkQL = async (url) => {
  try {
    console.log("QL host:" + url);

    url = "http://" + url + "/version";

    const response = await fetch(url);
    const json = await response;
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
};
// Check CrateDB Container
const checkCrateDb = async (url) => {
  try {
    console.log("Crate host:" + url);
    url = "http://" + url;
    //url = "http://177.104.61.60:4200";
    const response = await fetch(url);
    const json = await response;
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
};
// Check Orion Container
const checkOrion = async (url) => {
  try {
    console.log("Orion url" + url);
    url = url + "/version";
    // url = "http://177.104.61.60:1026/version"
    const response = await fetch(url);
    const json = await response;

    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
};
// Check API Container
const checkAPI = async (url) => {
  try {
    console.log("Checando a API se está ok");
    url = "http://" + url + "/";
    console.log("Essa é a URL: " + url);
    // url = "http://177.104.61.60:1026/version"
    const response = await fetch(url);
    const json = await response;
    console.log("Resposta da API");
    console.log(json);
    return true;
  } catch (error) {
    console.log(error);
    return false;
    console.log(error);
  }
};
// Check IoTAgentSwamp Container
const checkIoTAgent = async (url) => {
  try {
    console.log("IoTAgent host:" + url);
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
// Check MQTT Container
const CheckMqtt = async (url) => {
  try {
    console.log("MQTT host:" + url);
    var response = await initialize(url);

    return response;
  } catch (error) {
    return error;
    console.log(error);
  }
};
function initialize(url) {
  return (teste = new Promise(function (resolve, reject) {
    var mqtt = require("mqtt");

    var client = mqtt.connect("mqtt://" + url);

    var status;
    client.on("error", function (error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("disconnect", function (error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("reject", function (error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("close", function (error) {
      client.end();
      status = false;
      reject(status);
    });
    client.on("connect", function () {
      client.end();
      status = true;
      resolve(status);
    });
  }));
}

//Check the Mongo Container
const CheckMongo = async (url) => {
  try {
    console.log("Mongo host:" + url);
    var response = await testMongo(url);

    return true;
  } catch (error) {
    return false;
  }
};

function testMongo(url) {
  return (teste = new Promise(function (resolve, reject) {
    var mongoose = require("mongoose");
    var mongoDB = "mongodb://" + url;
    //mongoDB = "mongodb://177.104.61.60:3456"
    mongoose.connect(mongoDB);
    mongoose.connection.on("connected", function () {
      mongoose.connection.close();

      resolve(true);
    });

    mongoose.connection.on("error", function (err) {
      mongoose.connection.close();

      resolve(false);
    });
  }).catch(function (e) {
    console.log(e); // works!
  }));
}

var moment = require("moment");

const publish = async (host, result, id) => {
  try {
    console.log("Começar a publicar");
    url = "http://" + host + "/v2/entities/" + id + "/attrs?options=keyValues";
    console.log(url);
    var body = {
      available: result[1],
      ping_delay: parseInt(result[0].avg),
      ping_status: result[0].alive,
      timestamp: moment().unix(),
    };
    console.log("Body host:");
    console.log(body);
    var jsonstring = JSON.stringify(body);
    var aux = jsonstring.length;

    var opcoes = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "fiware-service": "openiot",
        "fiware-service-path": "/",
        "Content-Length": aux,
      },
      json: body,
    };

    const response = await fetch(url, opcoes);
    console.log(response);
    const json = await response;
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getData2 = async (url, ping_alive, ping_delay, available) => {
  console.log(url);
  try {
    var moment = require("moment");
    var headers = {
      "Content-Type": "application/json",
      "fiware-service": "openiot",
      "fiware-service-path": "/",
    };
    var data = {
      ping_delay: ping_delay,
      available: available,
      ping_status: ping_alive,
      timestamp: moment().valueOf(),
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const json = await response;
    console.log("URL: " + url);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = Thing;
