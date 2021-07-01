const sendMessage = require("../models/wabox");
const {
  AnomalyDetectorClient,
  KnownTimeGranularity,
} = require("@azure/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");
const csv = require("csv-parser");

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const outliers = require("outliers");

const dataAnomaly = [];

// Load the .env file if it exists
// const dotenv = require("dotenv");

// You will need to set this environment variables or edit the following values
const apiKey = "e82371c96e9b4fdaa9382d1d9ae4e24d";
const endpoint = "https://lorameter.cognitiveservices.azure.com/";
const timeSeriesDataPath =
  "C:\\Users\\affau\\Documents\\LORA BRO\\API\\request-data.csv";
//   "C:\\Users\\affau\\Documents\\LORA BRO\\API\\dataAnomaly.csv";
// fs
//   .createReadStream("dataAnomaly.csv")
//   .pipe(csv())
//   .on("data", function (row) {
//     const usage_kwh = row.usage_kwh;
//     const datetime = row.datetime;

//     const data = {
//       datetime: row.datetime,
//       usage_kwh: row.kwh,
//     };
//     dataAnomaly.push(data);
//   })
//   .on("end", function () {
//     console.table(dataAnomaly);
//     console.log(typeof dataAnomaly);
//     // TODO: SAVE users data to another file
//   });

function read_series_from_file(path) {
  let result = Array();
  let input = fs.readFileSync(path).toString();
  console.log(typeof input);
  let parsed = parse(input, { skip_empty_lines: true });
  parsed.forEach(function (e) {
    result.push({ timestamp: new Date(e[0]), value: Number(e[1]) });
  });

  var outliersData = [];

  for (let i = 0; i < result.length; i++) {
    outliersData[i] = result[i].value;
  }
  console.log("outliersData: ", outliersData);

  hasilOutliers = outliers(outliersData);
  console.log("jumlah outliers: ", hasilOutliers.length, hasilOutliers);
  //console.log("result:", result[0].value);
  return result;
}
// You will need to set this environment variables in .env file or edit the following values

module.exports = {
  funcMain: async function main() {
    console.log("menjalankan anomaly API");

    // create client
    const client = new AnomalyDetectorClient(
      endpoint,
      new AzureKeyCredential(apiKey)
    );

    // construct request
    const request = {
      series: read_series_from_file(timeSeriesDataPath),
      granularity: KnownTimeGranularity.daily,
    };

    console.log(request.series);
    // get change point detect results
    const result = await client.detectChangePoint(request);

    if (
      result.isChangePoint.some(function (changePoint) {
        return changePoint === true;
      })
    ) {
      console.log("Change points were detected from the series at index:");
      result.isChangePoint.forEach(function (changePoint, index) {
        if (changePoint === true) {
          var indexAnomaly = [];
          indexAnomaly.push(index);
          console.log(indexAnomaly.length);
          //console.log(index, typeof index);
          //sendMessage.funcSendMessage();
          console.log("Sukses Mengirim");
        }
      });
    } else {
      console.log("There is no change point detected from the series.");
    }
    // output:
    // Change points were detected from the series at index:
    // 20
    // 27
  },

  //   main().catch((err) => {
  //     console.error("The sample encountered an error:", err);
  //   });
};
