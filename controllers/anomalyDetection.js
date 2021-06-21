("use strict");

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const { AnomalyDetectorClient } = require("@azure/ai-anomaly-detector");
const { AzureKeyCredential } = require("@azure/core-auth");

const apiKey = "e82371c96e9b4fdaa9382d1d9ae4e24d";
const endpoint = "https://lorameter.cognitiveservices.azure.com/";
const data_source =
  "YOUR_SAMPLE_ZIP_FILE_LOCATED_IN_AZURE_BLOB_STORAGE_WITH_SAS";

const client = new AnomalyDetectorClient(
  endpoint,
  new AzureKeyCredential(apiKey)
);
