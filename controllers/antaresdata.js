const axios = require("axios");
const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const DataAntares = require("../models/antaresData");
// const DataMeter = require("../models/dataMeter");
const app = express();

const { parse, stringify } = require("flatted");
const hex = require("string-hex");
require("console-stamp")(console, "[HH:MM:ss]");
var allFunc = require("../models/allFunction");
const { array } = require("prop-types");
const { getJumlah } = require("../models/dataMeter");
const dataMeter = require("../controllers/datameter");
const { post } = require("request");
const e = require("express");

var datetime = new Date();
var jumlah;
var no_meter;

exports.findAll = (req, res) => {
  DataAntares.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });

  /**
   * ================================================================================
   * Solusi PERTAMA:
   * Sebenernya ini udah betul, dan bisa
   * yang namanya asinkronus function itu ya cara kerjanya
   * cuma bisa dapet value di dalem dia sendiri,
   * nah di bawah ini FuncGetJumlah ini termasuk async karena kan lu callback dari
   * getJumlah, di mana get jumlah itu dapet dari connection db,
   * nah connection ini yang sifatnya async. lo callback semua kan.
   * @see https://stackoverflow.com/questions/18195754/javascript-cant-assign-variable-values-due-to-asynchronous-function
   * ================================================================================
   */
  allFunc.FuncGetJumlah(function (err, callback) {
    // tugas lu cuma harus kerja di dalam function ini aja.
    // ini kan valuenya udah dapet:
    console.log("jumlah: ", callback, typeof callback);
    //var namaMeter = dataMeter.getNamaMeter(); // ini lu samain aja ya
    //console.log("namaMeter: ", typeof namaMeter); // ini lu samain aja ya

    var jumlahMeter = JSON.parse(JSON.stringify(callback[0])).cnt;

    console.log("Jumlah Meter: ", jumlahMeter);
    // kalo tadi mau for loop dll, ya lakuin aja di sini, mau insert, axios
    // terserah, di sini bisa semua.
    // logika lain
    // logika lain di sini aja.
    // dan seterusnya sampe abis exportnya. nested terus di dalem sini

    // potongan ini functional khusus buat solusi KEDUA
    //assigner(callback);
    allFunc.FuncGetNama(function (err, callback) {
      // tugas lu cuma harus kerja di dalam function ini aja.
      // ini kan valuenya udah dapet:
      console.log(
        "NamaMeter: ",
        callback,
        typeof callback,
        callback.length,
        JSON.parse(JSON.stringify(callback[1])).nama_meter
      );
      //var namaMeter = dataMeter.getNamaMeter(); // ini lu samain aja ya
      //console.log("namaMeter: ", typeof namaMeter); // ini lu samain aja ya

      var namaMeter = [];
      for (let i = 0; i < callback.length; i++) {
        namaMeter.push(JSON.parse(JSON.stringify(callback[i])).nama_meter);

        console.log(namaMeter[i]);
      }
      //var jumlahMeter = JSON.parse(JSON.stringify(callback[0])).cnt;

      //console.log("Jumlah Meter: ", jumlahMeter);
      // kalo tadi mau for loop dll, ya lakuin aja di sini, mau insert, axios
      // terserah, di sini bisa semua.
      // logika lain
      // logika lain di sini aja.
      // dan seterusnya sampe abis exportnya. nested terus di dalem sini

      // potongan ini functional khusus buat solusi KEDUA
      //assigner(callback);
    });
  });

  /**
   * ================================================================================
   * END SOLUSI PERTAMA
   * ================================================================================
   */

  // Nah sebelumnya ini lu gak bisa se mena-mena,
  // karena kalo console di sini kan artinya di luar function async.
  // kalo mau async ya async. mau sync ya pake sync juga. gue comment ya
  // console.log("jumlah: ", jumlah, typeof jumlah);
  // console.log("namaMeter: ", typeof namaMeter);

  /**
   * ================================================================================
   * SOLUSI KEDUA:
   * kalo mau solusi lain, async+sync sebenernya gampang, tapi terlalu risky
   * karena gak bisa mastiin async function kelarnya kapan, jadi opportunistic doang.
   * pake setTimeout aja. Contoh:
   * ================================================================================
   */
  function assigner(data) {
    jumlah = data;
  }

  // lu harus set mau dieksekusinya kapan, misal timeout 2.5 detik
  // coba sekarang lu pencet berkali2 si postman nya dalam waktu yang berdekatan,
  // tunggu dan dilihat hasilnya..
  // kekurangannya adalah dia munculnya telat2, request lu diprosesnya ya juga harus telat
  // khawatirnya nilainya ketuker2 aja sih. Jadi kalo mau make cara ini,
  // pastiin aja nilainya baik-baik aja. dan tidak terdistraksi oleh hal lain.
  // menurut gue lebih intuitive kalo pake yang async aja.
  setTimeout(function () {
    console.log(`SOLUSI LAIN: ${jumlah}`);

    // FOR LOOP DAN YANG LAINNYA
    // logika lain di sini
    // dan seterusnya sampe abis exportnya. nested terus
  }, 2500);

  /**
   * ================================================================================
   * END SOLUSI KEDUA:
   * ================================================================================
   */

  // const axiosJumlahMeter = axios.create({
  //   baseURL: "http://localhost:3001",
  //   headers: {
  //     "Content-Type": "application/json;ty=4",
  //     Accept: "application/json",
  //   },
  //   method: "get", // default
  // });

  // try {
  //   const responseJumlah = await axiosJumlahMeter.get("/jumlahmeter");

  //   // var APIData = JSON.parse(
  //   //   parse(stringify(response)).data["m2m:cin"].con
  //   // ).data;

  //   //console.log(responseJumlah);
  //   var jumlah1 = JSON.parse(JSON.stringify(responseJumlah.data[0])).cnt;

  //   console.log(jumlah1);

  //   // var NamaMeter =
  // } catch (error) {
  //   console.log(error);
  // }

  // const axiosNamaMeter = axios.create({
  //   baseURL: "http://localhost:3001",
  //   headers: {
  //     "Content-Type": "application/json;ty=4",
  //     Accept: "application/json",
  //   },
  //   method: "get", // default
  // });

  // try {
  //   const responseNama = await axiosNamaMeter.get("/namameter");

  //   console.log(JSON.parse(JSON.stringify(responseNama.data[0])).nama_meter);

  //   var arrayMeter = [];
  //   var dataMeterAll;
  //   for (let i = 0; i < jumlah1; i++) {
  //     dataMeterAll = arrayMeter.push(
  //       JSON.parse(JSON.stringify(responseNama.data[i])).nama_meter
  //     );

  //     console.log(arrayMeter[i]);
  //   }

  //   // var NamaMeter =
  // } catch (error) {
  //   console.log(error);
  // }

  // DataMeter.getJumlah((err, data) => {
  //   //console.log(data);
  //   jumlah = data;

  //   var jumlah1 = JSON.parse(JSON.stringify(jumlah[0])).cnt;
  //   // console.log("jumlah: ", jumlah1, "\n");
  //   //console.log(jumlah1, typeof jumlah1);
  //   DataMeter.getAll((err, data) => {
  //     namaMeter = data;
  //     //console.log(jumlah1);
  //     var arrayMeter = [];
  //     var dataMeterAll;
  //     for (let i = 0; i < jumlah1; i++) {
  //       dataMeterAll = arrayMeter.push(
  //         JSON.parse(JSON.stringify(namaMeter[i])).nama_meter
  //       );
  //       //console.log(arrayMeter[i]);
  //     }
  //   });
  // });
};

exports.findOne = (req, res) => {
  console.log("no_meter: ", typeof req.params.No_Meter);
  DataAntares.findById(req.params.No_Meter, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found No_Meter with id ${req.params.No_Meter}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Data with id " + req.params.No_Meter,
        });
      }
    } else res.send(data);
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

  allFunc.FuncGetJumlah(function (err, callback) {
    // tugas lu cuma harus kerja di dalam function ini aja.
    // ini kan valuenya udah dapet:
    console.log("jumlah: ", callback, typeof callback);
    //var namaMeter = dataMeter.getNamaMeter(); // ini lu samain aja ya
    //console.log("namaMeter: ", typeof namaMeter); // ini lu samain aja ya

    var jumlahMeter = JSON.parse(JSON.stringify(callback[0])).cnt;

    console.log("Jumlah Meter: ", jumlahMeter);
    // kalo tadi mau for loop dll, ya lakuin aja di sini, mau insert, axios
    // terserah, di sini bisa semua.
    // logika lain
    // logika lain di sini aja.
    // dan seterusnya sampe abis exportnya. nested terus di dalem sini

    // potongan ini functional khusus buat solusi KEDUA
    //assigner(callback);

    allFunc.FuncGetNama(function (err, callback) {
      // tugas lu cuma harus kerja di dalam function ini aja.
      // ini kan valuenya udah dapet:
      console.log(
        "NamaMeter: ",
        callback,
        typeof callback,
        callback.length,
        JSON.parse(JSON.stringify(callback[1])).nama_meter
      );
      //var namaMeter = dataMeter.getNamaMeter(); // ini lu samain aja ya
      //console.log("namaMeter: ", typeof namaMeter); // ini lu samain aja ya

      var namaMeter = [];
      for (let i = 0; i < callback.length; i++) {
        namaMeter.push(JSON.parse(JSON.stringify(callback[i])).nama_meter);

        console.log(namaMeter[i]);
      }
      //var jumlahMeter = JSON.parse(JSON.stringify(callback[0])).cnt;

      //console.log("Jumlah Meter: ", jumlahMeter);
      // kalo tadi mau for loop dll, ya lakuin aja di sini, mau insert, axios
      // terserah, di sini bisa semua.
      // logika lain
      // logika lain di sini aja.
      // dan seterusnya sampe abis exportnya. nested terus di dalem sini

      // potongan ini functional khusus buat solusi KEDUA
      //assigner(callback);

      const axiosInstance = axios.create({
        baseURL: "https://platform.antares.id:8443/",
        headers: {
          "X-M2M-Origin": "bd8c8c443410ba45:886a6c0b7af4ff6d",
          "Content-Type": "application/json;ty=4",
          Accept: "application/json",
        },
        method: "get", // default
      });

      var post_resp = [];
      for (let i = 0; i < jumlahMeter; i++) {
        try {
          var url = `${"~/antares-cse/antares-id/Energy_Meter/"}${
            namaMeter[i]
          }${"/la"}`;

          console.log("URL:", url);

          // axiosInstance.get(url).then(resp => {
          //   console.log(`RESPONSE HEHE: ` + resp);
          // }).catch(err => {

          // });

          axiosInstance
            .get(url)
            .then(async (response) => {
              console.log(`Response: ${response}`);
              // nah, sekarang pake flatted untuk parsing dan stringifynya
              // karena response dari axios tsb bentuknya circular json (atau nested json)
              // console.log(JSON.parse(parse(stringify(response)).data['m2m:cin'].con).data)

              var APIData = JSON.parse(
                parse(stringify(response)).data["m2m:cin"].con
              ).data;

              var tanggal = JSON.parse(
                JSON.stringify(response.data["m2m:cin"])
              ).ct;

              var assigners = function (data) {
                no_meter = data;
              };

              assigners(APIData);

              //console.log("DATA ASLI JSON: " + APIData);

              // console.log(new Buffer.from(APIData, "Hex"));
              // console.log(APIData);

              APIData = APIData.slice(20, 80);

              // console.log("APIData Yang Digunakan: " + APIData);

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
                //console.log("Data Hex: " + Data1);
                // console.log("hexa33: " + hexa33);

                var HasilData = Data1 - hexa33;
                //console.log(typeof HasilData);
                //console.log("HasilDataInteger: " + HasilData, "\n");

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
              //console.log("HASILDATA FINAL: " + HasilDataFinal);

              //APIData = APIData.hexEncode().hexDecode();
              // console.log(APIData);

              // APIData = dataHex.slice(0, 2);
              // console.log("Slice 0 2: "  + APIData);
              //console.log(json_data);

              //var hexBuatan = "0x";
              //console.log("HASIL SLICE: " + HasilDataFinal.slice(0, 4));
              // var Hex2Float = parseFloat(HasilDataFinal.slice(36, 41));
              // console.log("PANJANG DATA: " + HasilDataFinal.length);
              // console.log(Hex2Float);

              //var address = HasilDataFinal.slice(1, 9);
              //console.log("NOMETER:" + no_meter);
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

              //console.log("HASIL NO METER: " + hasil_no_meter);

              var activeTotal = HasilDataFinal.slice(9, 17);
              var activePlus = HasilDataFinal.slice(17, 25);
              var activeMinus = HasilDataFinal.slice(25, 33);
              var voltage = HasilDataFinal.slice(33, 37);
              var current = HasilDataFinal.slice(37, 43);
              var instantPower = HasilDataFinal.slice(43, 49);
              var frequency = HasilDataFinal.slice(49, 53);
              var powerFactor = HasilDataFinal.slice(53, 57);
              var status = HasilDataFinal.slice(57, 58);

              // console.log("\n\n");
              // console.log("activeTotal: " + activeTotal);
              // console.log("activePlus: " + activePlus);
              // console.log("activeMinus: " + activeMinus);
              // console.log("voltage: " + voltage);
              // console.log("current: " + current);
              // console.log("instantPower: " + instantPower);
              // console.log("frequency: " + frequency);
              // console.log("powerFactor: " + powerFactor);
              // console.log("status: " + status);
              // console.log("\n\n");

              allFunc.FuncVoltage(voltage);
              allFunc.FuncCurrent(current);
              allFunc.FuncActiveTotal(activeTotal);
              allFunc.FuncActivePlus(activePlus);
              allFunc.FuncActiveMinus(activeMinus);
              allFunc.FuncInstantPower(instantPower);
              allFunc.FuncFrequency(frequency);
              allFunc.FuncPowerFactor(powerFactor);
              //console.log(HasilDataFinal.slice(32, 35).length);

              // console.log(
              //   "activeTotal: " + allFunc.FuncActiveTotal(activeTotal)
              // );

              tanggalFix = allFunc.FuncConvertDate(tanggal);

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
                Datetime: tanggalFix,
              });

              // console.log(newData.Datetime(Date.now()));
              // console.log(toString(newData.Datetime(Date.now())));

              DataAntares.create(newData, (err, data) => {
                console.log(`DATAAAAA: ${data}`);

                var responseAssigner = function (err, data) {
                  if (err) {
                    post_resp.push(err);
                    res.send(data);
                  } else {
                    res.send(data);
                  }
                };

                post_resp.push(data);

                if (i == jumlahMeter - 1) responseAssigner(err, post_resp);

                console.log(`ITERATION: ${i}`);
              });
            })
            .catch((err) => {
              // Handle Error Here
              console.error(err);
            });
        } catch (error) {
          // perhatikan pesan error, setiap promise try and catch,
          // artinya best practicenya kita harus menyediakan si error itu muncul
          // instead of ini:
          // console.log('\n GAGAL\n');
          // lebih baik ini
          console.log(error);
        }
      }
    });
  });
};
