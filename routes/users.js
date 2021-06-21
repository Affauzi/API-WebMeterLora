module.exports = (app) => {
  const users = require("../controllers/users");
  const loginUser = require("../controllers/login");
  // Retrieve all Customers
  app.get("/users", users.findAll);

  app.get("/users/:No_Meter", users.findOne);

  app.post("/users", users.create);

  app.post("/login", loginUser.create);
};
