module.exports = (app) => {
  const users = require("../controllers/users");

  // Retrieve all Customers
  app.get("/users", users.findAll);
};
