const cron = require("node-cron");
const express = require("express");

app = express();

// CRON JOB EXECUTANDO DE UM EM UM MINUTO
cron.schedule("*/10 * * * *", function() {
  var prom = require("./prom");
  prom.checkAll("http://177.104.61.17:1026");
  console.log("Retorno é ");
  console.log(prom());
  console.log("Executando a tarefa a cada 10 minutos");
});

app.listen(1313);
