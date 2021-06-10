const express = require("express");
const bodyParser = require("body-parser");
var cron = require("node-cron");
const routeAntares = require("./routes/antaresData");
var router = express.Router();

// ini gue tambahin untuk logging backend, kalo gak diperlukan, apus aja
var morgan = require("morgan");
const { post } = require("request");

const app = express();

// gue pake morgan di sini, gue jadinya start server pake nodemon server.js
app.use(morgan("dev"));

// parse requests of content-type: application/json
// app.use(bodyParser.json());

// hmm, instead of pake bodyParser, lebih baik pake expressnya langsung,
// karena bodyParser udah deprecated
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
// menurut gue ini gak begitu perlu.
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "lorameter" });
});

cron.schedule("*/1 * * * *", async function (req, res) {
  // await fetch("http://localhost:3001/data", {
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   method: "POST",
  // });
  console.log(`one minute passed`);
  req.url = "/data";
  req.method = "POST";
  return app._router.handle(req, res, next);
  // let url = "http://localhost:3001/data/";
  // await getData(url);

  //fetchingData();
});

require("./routes/users")(app);
require("./routes/antaresData")(app);
require("./routes/dataMeter")(app);

// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
