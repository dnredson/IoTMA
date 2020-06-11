async function main() {
  var http = require("http");
  const fetch = require("node-fetch");
  var fs = require("fs");

  var jsonData = JSON.parse(fs.readFileSync("manager.conf", "utf8"));
  url =
    "http://" +
    jsonData.brokerAddress +
    ":" +
    jsonData.brokerPort +
    "/v2/entities/" +
    jsonData.monitoringEntity;
  console.log(url);
  var opcoes = {
    json: true,
    headers: {
      Accept: "application/json",
      "fiware-service": "openiot",
      "fiware-service-path": "/",
    },
  };

  try {
    const response = await fetch(url, opcoes);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
}

Promise.all([main()])
  .then(function (result1) {
    console.log("Monitoring");
    numberOfMonitoredEntities = result1[0].entities.value.length;

    var samplinginterval = result1[0].samplinginterval.value;
    var Thing = require("./thing");
    for (var i = 0; i < numberOfMonitoredEntities; i++) {
      var objThing = new Thing(result1[0].entities.value[i], samplinginterval);
      objThing.startCheck();
    }
  })
  .catch((err) => {
    console.log(err);
    console.log(
      "Não foi possível obter a entidade de configuração! Verifique o endereço e se o Orion está sendo executado"
    );
  });
