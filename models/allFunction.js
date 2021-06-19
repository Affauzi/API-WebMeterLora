const { response } = require("express");
const connection = require("./database");

function getJumlah(word, callback) {
  connection.query(
    "SELECT COUNT(*) as cnt FROM uimeter_datameter",
    function (err, rows) {
      if (err) return callback(err);

      //console.log("rows:", rows);
      callback(null, rows);
    }
  );
}

function getNama(word, callback) {
  connection.query(
    "SELECT nama_meter FROM uimeter_datameter",
    function (err, rows) {
      if (err) return callback(err);

      //console.log("rows:", rows);
      callback(null, rows);
    }
  );
}

module.exports = {
  FuncVoltage: function FuncVoltage(str) {
    var tempVol = str.slice(2, 4);
    var tempVol2 = str.slice(0, 1);
    var rounding = str.slice(1, 2);

    var finalVoltage = tempVol.concat(tempVol2, ".", rounding);
    // console.log("Final Voltage: " + finalVoltage);

    return finalVoltage;
  },

  FuncCurrent: function FuncCurrent(str) {
    var tempCurr = str.slice(2, 3);
    var rounding = str.slice(3, 4);
    var rounding1 = str.slice(0, 2);

    var finalCurrent = tempCurr.concat(".", rounding, rounding1);
    // console.log("FinalCurrent: " + finalCurrent);

    return finalCurrent;
  },

  FuncActiveTotal: function FuncActiveTotal(str) {
    var base = str.slice(4, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActiveTotal = base.concat(base1, ".", rounding);

    // console.log("FinalActiveTotal: " + finalActiveTotal);

    return finalActiveTotal;
  },

  FuncActivePlus: function FuncActivePlus(str) {
    var base = str.slice(4, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActivePlus = base.concat(base1, ".", rounding);

    // console.log("FinalActivePlus: " + finalActivePlus);

    return finalActivePlus;
  },

  FuncInstantPower: function FuncInstantPower(str) {
    var base = str.slice(5, 6);
    var rounding = str.slice(2, 4);

    var finalInstantPower = base.concat(".", rounding);
    // console.log("finalInstantPower:" + finalInstantPower);

    return finalInstantPower;
  },

  FuncFrequency: function FuncFrequency(str) {
    var base = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalFrequency = base.concat(".", rounding);
    // console.log("finalFrequency:" + finalFrequency);

    return finalFrequency;
  },

  FuncPowerFactor: function FuncPowerFactor(str) {
    var base = str.slice(2, 3);
    var rounding = str.slice(0, 2);

    var finalPowerFactor = base.concat(".", rounding);
    // console.log("finalPowerFactor:" + finalPowerFactor);

    return finalPowerFactor;
  },

  FuncActiveMinus: function FuncActiveMinus(str) {
    var base = str.slice(5, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActiveMinus = base.concat(base1, ".", rounding);

    // console.log("FinalActiveMinus: " + finalActiveMinus);

    return finalActiveMinus;
  },
  FuncGetJumlah: function FuncGetJumlah(callback) {
    getJumlah("e", function (err, result) {
      if (err || !result.length) return callback("error or no results");
      // since result is array of objects [{word: 'someword'},{word: 'someword2'}] let's remap it
      result = result.map((obj) => obj);
      // result should now look like ['someword','someword2']
      // return it
      //console.log(result);
      callback(null, result);

      // return result;
    });
  },

  FuncGetNama: function FuncGetNama(callback) {
    getNama("e", function (err, result) {
      if (err || !result.length) return callback("error or no results");
      // since result is array of objects [{word: 'someword'},{word: 'someword2'}] let's remap it
      result = result.map((obj) => obj);
      // result should now look like ['someword','someword2']
      // return it
      //console.log(result);
      callback(null, result);

      // return result;
    });
  },

  FuncConvertDate: function FuncConvertDate(data) {
    var tahun = data.slice(0, 4);
    var bulan = data.slice(4, 6);
    var hari = data.slice(6, 8);
    var jam = data.slice(9, 11);
    var menit = data.slice(11, 13);
    var detik = data.slice(13, 15);

    var hasildatetime = hari.concat(
      "-",
      bulan,
      "-",
      tahun,
      " ",
      jam,
      ":",
      menit,
      ":",
      detik
    );

    return hasildatetime;
  },

  FuncGetURL: function FuncGetURL() {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  },
};

// module.exports = {bcdToFloat32, bcdTo10Th}
