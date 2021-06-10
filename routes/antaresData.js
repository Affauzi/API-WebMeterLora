module.exports = (app) => {
  const data = require("../controllers/antaresdata");

  // Retrieve all Customers
  app.get("/data", data.findAll);

  app.post("/data", data.create);
};

// module.exports = {
//   funcPost: function postData() {
//     const data = require("../controllers/antaresdata");

//     data.create;
//   },
// };
