module.exports = app => {
  const data = require("../controllers/antaresdata");

  // Retrieve all Customers
  app.get("/data", data.findAll);

  app.post("/data", data.create);

};