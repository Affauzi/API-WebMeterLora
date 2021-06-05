const sql = require("./database");

// constructor
const DataAntares = function (dataAntares) {
  this.ActiveTotal = dataAntares.ActiveTotal;
  this.ActivePlus = dataAntares.ActivePlus;
  this.ActiveMinus = dataAntares.ActiveMinus;
  this.Voltage = dataAntares.Voltage;
  this.Current = dataAntares.Current;
  this.InstantPower = dataAntares.InstantPower;
  this.Frequency = dataAntares.Frequency;
  this.PowerFactor = dataAntares.PowerFactor;
  this.Status = dataAntares.Status;
  this.No_Meter = dataAntares.No_Meter;
  this.Datetime = dataAntares.Datetime;
};

DataAntares.getAll = (result) => {
  sql.query("SELECT * FROM uimeter_dataantares", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("datameter: ", res);
    result(null, res);
  });
};

DataAntares.create = (dataMeter, result) => {
  sql.query("INSERT INTO uimeter_dataantares SET ?", dataMeter, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created datameter: ", { ...dataMeter });
    result(null, { ...dataMeter });
  });
};

module.exports = DataAntares;
