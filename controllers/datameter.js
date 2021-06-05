const DataMeter = require("../models/dataMeter");

exports.findAll = (req, res) => {
  DataMeter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};
