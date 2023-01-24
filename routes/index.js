/*
  This file handles requests made to your project's URL.
  If someone visits your project's page in a browser, the content of views/home.handlebars will be served.
  
  See examples below of how to handle responding to requests made from a command line.
*/
const express = require("express"),
  fs = require("fs"),
  helpers = require.main.require("./helpers/helpers.js"),
  hello = require.main.require("./helpers/hello.js"),
  racing = require.main.require("./helpers/racing.js"),
  router = express.Router();

router.get("/", async (req, res) => {
  const userAgent = req.headers["user-agent"];
  if (helpers.isCommandline(userAgent)) {
    /* Respond with a static message */

    // res.send(hello.hello());

    /* Respond with an animated message */

    // const stream = helpers.getStream(req, res);
    // await hello.animateHello(stream);

    /* A bit more advanced example: */

    const stream = helpers.getStream(req, res);
    let options = {};

    /*
      You can pass query arguments to your app, for example:
      curl https://node-web-console.glitch.me?cars=99
    */

    if (req.query && req.query.cars) {
      options.cars = parseInt(req.query.cars);
    }

    /*
      You can also retrieve user's IP address, for example if you want to show weather in user's location.
      const ipAddress = helpers.getClientIp(req);
    */

    await racing.race(stream, options);
  } else {
    res.render("../views/home.handlebars", {
      project_name: process.env.PROJECT_DOMAIN,
    });
  }
});

module.exports = router;
