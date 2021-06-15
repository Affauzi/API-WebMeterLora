module.exports = (app) => {
  const data = require("../controllers/antaresdata");

  // Retrieve all Customers
  app.get("/data", data.findAll);

  app.get("/data/:No_Meter", data.findOne);

  app.post("/data", data.create, function (req, res) {
    //res.send("A"); //data.create
  });

  // funcGetPost: function getPost(req, res, next) {
  //   req.url = '/data'
  //   /* Uncomment the next line if you want to change the method */
  //   // req.method = 'POST'
  //   return app._router.handle(req, res, next)
  // }
};
