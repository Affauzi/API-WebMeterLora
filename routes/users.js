module.exports = (app) => {
  const users = require("../controllers/users");

  // Retrieve all Customers
  app.get("/users", users.findAll);

  app.get("/users/:No_Meter", users.findOne);

  app.post("/users", users.create);
};
