const LoginUser = require("../models/login");
const { sha256 } = require("js-sha256");

exports.findAll = (req, res) => {
  LoginUser.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const user = new LoginUser({
    No_Meter: req.body.no_meter,
    //nama: req.body.nama,
    password: req.body.password,
    //status: req.body.status,
  });

  user.password = sha256(user.password + user.No_Meter);

  // Save Customer in the database
  LoginUser.create([user.No_Meter, user.password], (err, data) => {
    // console.log(user.password);
    // console.log(user.No_Meter);
    // console.log("data:", data);
    // console.log(user.nama);
    // console.log(user.status);

    // if (user.No_Meter != null && user.nama != null && user.password != null) {
    //   user.status = 1;
    // } else {
    //   user.status = 0;
    // }

    if (user.No_Meter == null) {
      throw new Error("No Meter Tidak Boleh Kosong");
    }
    if (user.password == null) {
      throw new Error("Password Tidak Boleh Kosong");
    }

    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while getting User.",
      });
    else res.send(data);
  });
};
