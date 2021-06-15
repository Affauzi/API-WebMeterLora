const Users = require("../models/users");
const { sha256 } = require("js-sha256");

exports.findAll = (req, res) => {
  Users.getAll((err, data) => {
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
  const user = new Users({
    No_Meter: req.body.no_meter,
    nama: req.body.nama,
    password: sha256(toString(req.body.password) + toString(req.body.no_meter)),
    status: req.body.status,
  });

  // Save Customer in the database
  Users.create(user, (err, data) => {
    console.log(user.password);
    console.log(user.No_Meter);
    console.log(user.nama);
    console.log(user.status);

    if (user.No_Meter != null && user.nama != null && user.password != null) {
      user.status = 1;
    } else {
      user.status = 0;
    }

    console.log(user.password);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Users.findById(req.params.No_Meter, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        console.log("no_meter: ", treq.params.No_Meter);
        res.status(404).send({
          message: `Not found No_Meter with id ${req.params.No_Meter}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.No_Meter,
        });
      }
    } else res.send(data);
  });
};
