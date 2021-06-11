const express = require("express");
const bodyParser = require("body-parser");
var cron = require("node-cron");
var router = express.Router();
const data = require("./controllers/antaresdata");

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

cron.schedule("*/5 * * * * *", async function () {
  console.log("berhasil");
  await fetch("http://localhost:3001/data", {
    method: "POST",
  });
});

require("./routes/users")(app);
require("./routes/antaresData")(app);
require("./routes/dataMeter")(app);

// set port, listen for requests
app.listen(3001, () => {
  console.log("Server is running on port 3001.");
});
