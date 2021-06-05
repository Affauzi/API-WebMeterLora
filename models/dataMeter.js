const sql = require("./database");

// constructor
const DataMeter = function (dataMeter) {
  this.no_meter = dataMeter.no_meter;
  this.nama_meter = dataMeter.nama_meter;
};

DataMeter.getAll = (result) => {
  sql.query("SELECT nama_meter FROM uimeter_datameter", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("datameter: ", res);
    result(null, res);
  });
};

DataMeter.getJumlah = (result) => {
  sql.query("SELECT COUNT(*) as cnt FROM uimeter_datameter", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("Jumlah Data: ", res);
    result(null, res);
  });
};

DataMeter.create = (dataMeter, result) => {
  sql.query("INSERT INTO uimeter_datameter SET ?", dataMeter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created datameter: ", { ...dataMeter });
    result(null, { ...dataMeter });
  });
};

module.exports = DataMeter;
