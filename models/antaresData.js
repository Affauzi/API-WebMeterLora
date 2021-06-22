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
  sql.query(
    "SELECT * FROM uimeter_dataantares ORDER by datetime DESC LIMIT 100",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      //console.log("datameter: ", res);
      result(null, res);
    }
  );
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

DataAntares.findById = (No_Meter, result) => {
  console.log("no_meter: ", No_Meter);
  sql.query(
    `SELECT * FROM uimeter_dataantares WHERE no_meter = ${No_Meter} ORDER by datetime DESC LIMIT 20`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Data Meter: ", res);
        result(null, res);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = DataAntares;
