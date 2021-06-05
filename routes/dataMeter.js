module.exports = (app) => {
  const data = require("../controllers/datameter");

  // Retrieve all Customers
  app.get("/datameter", data.findAll);
};
