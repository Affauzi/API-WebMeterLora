const Users = require("../models/users");

exports.findAll = (req, res) => {
    Users.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };