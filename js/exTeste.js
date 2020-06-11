module.exports = {
  hello: function (type) {
    if (this.processname.includes("connection")) {
      console.log("Checking Connection");
      url = this.target;

      var url3 =
        "http://" +
        this.host +
        "/v2/entities/" +
        id +
        "/attrs?options=keyValues";
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

            // publish(url2,result1,id);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  },
};
