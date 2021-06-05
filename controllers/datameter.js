const DataMeter = require("../models/dataMeter");

exports.findAll = (req, res) => {
  DataMeter.getAll((err, namaMeter) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(namaMeter);
  });
};

exports.findOne = (req, res) => {
  DataMeter.getJumlah((err, jumlahMeter) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(jumlahMeter);
  });
};
