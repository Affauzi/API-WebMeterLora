const axios = require("axios");
const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const DataAntares = require("../models/antaresData");
const DataMeter = require("../models/dataMeter");
const app = express();

const { parse, stringify } = require("flatted");
const hex = require("string-hex");
require("console-stamp")(console, "[HH:MM:ss]");
var allFunc = require("../models/allFunction");
const { array } = require("prop-types");
const { getJumlah } = require("../models/dataMeter");

var datetime = new Date();

exports.findAll = async (req, res) => {
  DataAntares.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });

  const axiosJumlahMeter = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    method: "get", // default
  });

  try {
    const responseJumlah = await axiosJumlahMeter.get("/jumlahmeter");

    // var APIData = JSON.parse(
    //   parse(stringify(response)).data["m2m:cin"].con
    // ).data;

    //console.log(responseJumlah);
    var jumlah1 = JSON.parse(JSON.stringify(responseJumlah.data[0])).cnt;

    console.log(jumlah1);

    // var NamaMeter =
  } catch (error) {
    console.log(error);
  }

  const axiosNamaMeter = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    method: "get", // default
  });

  try {
    const responseNama = await axiosNamaMeter.get("/namameter");

    console.log(JSON.parse(JSON.stringify(responseNama.data[0])).nama_meter);

    var arrayMeter = [];
    var dataMeterAll;
    for (let i = 0; i < jumlah1; i++) {
      dataMeterAll = arrayMeter.push(
        JSON.parse(JSON.stringify(responseNama.data[i])).nama_meter
      );

      console.log(arrayMeter[i]);
    }

    // var NamaMeter =
  } catch (error) {
    console.log(error);
  }

  DataMeter.getJumlah((err, data) => {
    //console.log(data);
    jumlah = data;

    var jumlah1 = JSON.parse(JSON.stringify(jumlah[0])).cnt;
    // console.log("jumlah: ", jumlah1, "\n");
    //console.log(jumlah1, typeof jumlah1);
    DataMeter.getAll((err, data) => {
      namaMeter = data;
      //console.log(jumlah1);
      var arrayMeter = [];
      var dataMeterAll;
      for (let i = 0; i < jumlah1; i++) {
        dataMeterAll = arrayMeter.push(
          JSON.parse(JSON.stringify(namaMeter[i])).nama_meter
        );
        //console.log(arrayMeter[i]);
      }
    });
  });
};

exports.create = async (req, res) => {
  // Validate request
  //  console.log(JSON.parse(JSON.parse(JSON.stringify(req.body))['m2m:cin'].con).data);
  //res.send(req.body);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const axiosJumlahMeter = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    method: "get", // default
  });

  try {
    const responseJumlah = await axiosJumlahMeter.get("/jumlahmeter");

    var jumlah1 = JSON.parse(JSON.stringify(responseJumlah.data[0])).cnt;

    console.log("jumlah: ", jumlah1);

    // var NamaMeter =
  } catch (error) {
    console.log(error);
  }

  const axiosNamaMeter = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    method: "get", // default
  });

  try {
    const responseNama = await axiosNamaMeter.get("/namameter");

    //console.log(JSON.parse(JSON.stringify(responseNama.data[0])).nama_meter);

    var arrayMeter = [];
    var dataMeterAll;
    for (let i = 0; i < jumlah1; i++) {
      dataMeterAll = arrayMeter.push(
        JSON.parse(JSON.stringify(responseNama.data[i])).nama_meter
      );

      console.log(arrayMeter[i], "\n");
    }
  } catch (error) {
    console.log(error);
  }

  const axiosInstance = axios.create({
    baseURL: "https://platform.antares.id:8443/",
    headers: {
      "X-M2M-Origin": "bd8c8c443410ba45:886a6c0b7af4ff6d",
      "Content-Type": "application/json;ty=4",
      Accept: "application/json",
    },
    method: "get", // default
  });

  for (let i = 0; i < jumlah1; i++) {
    try {
      var url = `${"~/antares-cse/antares-id/Energy_Meter/"}${
        arrayMeter[i]
      }${"/la"}`;

      console.log("URL:", url);

      const response = await axiosInstance.get(url);

      // console.log(response);
      // nah, sekarang pake flatted untuk parsing dan stringifynya
      // karena response dari axios tsb bentuknya circular json (atau nested json)
      // console.log(JSON.parse(parse(stringify(response)).data['m2m:cin'].con).data)

      var APIData = JSON.parse(
        parse(stringify(response)).data["m2m:cin"].con
      ).data;

      var no_meter = APIData;
      // console.log("DATA ASLI JSON: " + APIData);

      // console.log(new Buffer.from(APIData, "Hex"));
      // console.log(APIData);

      APIData = APIData.slice(20, 80);

      // console.log("APIData 20-80: " + APIData);

      // console.log("APIData 0-2: " + APIData.slice(0, 2));
      // console.log("APIData 2-4: " + APIData.slice(2, 4));
      dataHex = hex(APIData);

      var j = 0,
        k = 2;

      var hexa33 = 51;
      //console.log("hexa33toBin: " + hexa33);
      //console.log(APIData.length);

      var HexTemp = 0,
        HexTemp2;

      for (let i = 0; i < APIData.length / 2; i++) {
        //console.log(j, k)

        var Data1 = APIData.slice(j, k);
        //console.log(Data1)

        Data1 = parseInt(Data1, 16);

        // Data1 = hex2bin(Data1)
        // console.log(typeof Data1);
        // console.log("Data1 Hex: " + Data1);
        // console.log("hexa33: " + hexa33);

        var HasilData = Data1 - hexa33;
        //console.log(typeof HasilData);
        // console.log("HasilDataInteger: " + HasilData);

        //console.log(HasilData.toString().length);

        if (HasilData.toString().length == 1) {
          HasilData = "0" + HasilData;
          // console.log("HasilData If: " + HasilData + "\n");
        } else {
          HasilData = HasilData.toString(16);
          //console.log(typeof HasilData);
          // console.log("HasilData else: " + HasilData + "\n");
        }

        //PERHITUNGAN DIMULAI DARI INDEX KE-1 KARENA ADA PENAMBAHAN 0 DIAWAL DATA
        HexTemp2 = HasilData;

        var HasilDataFinal = `${HexTemp}${HexTemp2}`;

        HexTemp = HasilDataFinal;

        //console.log("Data2Hex: " + Data2Hex)
        //DataHexadecimal = DataHexadecimal+toString(Data2Hex);

        j += 2;
        k += 2;
      }
      // console.log(typeof HasilDataFinal);
      // console.log("HASILDATA FINAL: " + HasilDataFinal);

      //APIData = APIData.hexEncode().hexDecode();
      // console.log(APIData);

      // APIData = dataHex.slice(0, 2);
      // console.log("Slice 0 2: " + APIData);
      //console.log(json_data);
    } catch (error) {
      // perhatikan pesan error, setiap promise try and catch,
      // artinya best practicenya kita harus menyediakan si error itu muncul
      // instead of ini:
      // console.log('\n GAGAL\n');
      // lebih baik ini
      console.log(error);
    }

    //var hexBuatan = "0x";
    //console.log("HASIL SLICE: " + HasilDataFinal.slice(0, 4));
    // var Hex2Float = parseFloat(HasilDataFinal.slice(36, 41));
    // console.log("PANJANG DATA: " + HasilDataFinal.length);
    // console.log(Hex2Float);

    //var address = HasilDataFinal.slice(1, 9);

    var m = 12,
      n = 14;
    var hasil_no_meter;
    var tmp_no_meter2 = "";
    for (let i = 0; i < 6; i++) {
      //console.log(m, n);
      var tmp_no_meter = no_meter.slice(m, n);

      //console.log("NO_METER: " + tmp_no_meter);
      // var hasil_no_meter = no_meter;
      //console.log(typeof tmp_no_meter);

      hasil_no_meter = tmp_no_meter2.concat(tmp_no_meter);

      tmp_no_meter2 = hasil_no_meter;

      (m = m - 2), (n = n - 2);
    }

    console.log("HASIL NO METER: " + hasil_no_meter);

    var activeTotal = HasilDataFinal.slice(9, 17);
    var activePlus = HasilDataFinal.slice(17, 25);
    var activeMinus = HasilDataFinal.slice(25, 33);
    var voltage = HasilDataFinal.slice(33, 37);
    var current = HasilDataFinal.slice(37, 43);
    var instantPower = HasilDataFinal.slice(43, 49);
    var frequency = HasilDataFinal.slice(49, 53);
    var powerFactor = HasilDataFinal.slice(53, 57);
    var status = HasilDataFinal.slice(57, 58);

    // console.log("address: " + address);
    // console.log("activeTotal: " + activeTotal);
    // console.log("activePlus: " + activePlus);
    // console.log("activeMinus: " + activeMinus);
    // console.log("voltage: " + voltage);
    // console.log("current: " + current);
    // console.log("instantPower: " + instantPower);
    // console.log("frequency: " + frequency);
    // console.log("powerFactor: " + powerFactor);
    // console.log("status: " + status);

    allFunc.FuncVoltage(voltage);
    allFunc.FuncCurrent(current);
    allFunc.FuncActiveTotal(activeTotal);
    allFunc.FuncActivePlus(activePlus);
    allFunc.FuncActiveMinus(activeMinus);
    allFunc.FuncInstantPower(instantPower);
    allFunc.FuncFrequency(frequency);
    allFunc.FuncPowerFactor(powerFactor);
    //console.log(HasilDataFinal.slice(32, 35).length);

    // Create a DataAntares
    var newData = new DataAntares({
      ActiveTotal: allFunc.FuncActiveTotal(activeTotal),
      ActivePlus: allFunc.FuncActivePlus(activePlus),
      ActiveMinus: allFunc.FuncActiveMinus(activeMinus),
      Voltage: allFunc.FuncVoltage(voltage),
      Current: allFunc.FuncCurrent(current),
      InstantPower: allFunc.FuncInstantPower(instantPower),
      Frequency: allFunc.FuncFrequency(frequency),
      PowerFactor: allFunc.FuncPowerFactor(powerFactor),
      Status: status,
      No_Meter: hasil_no_meter,
      Datetime: datetime,
    });

    DataAntares.create(newData, (err, data) => {
      //res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Type", "text/html");
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the AntaresData.",
        });
      else res.write(data);

      res.send();
    });

    i += 1;
  }
};
