"use strict";

const axios = require("axios");
var crypto = require("crypto");
//var id = crypto.randomBytes(20).toString('hex');

var apiToken = "52bb096da6f4057604450dfd9855054c60d07f6454b46";
var phoneNumber = "6282113369110";
var toPhoneNumber = "6282123054525";
var custom_uid = crypto.randomBytes(20).toString("hex");
var text = "Terdapat anomaly data";

var data = {};

const url = `https://www.waboxapp.com/api/send/chat?token=${apiToken}&uid=${phoneNumber}&to=${toPhoneNumber}&custom_uid=${custom_uid}&text=${text}`;

module.exports = {
  funcSendMessage: async function sendMessage() {
    console.log(url);
    axios
      .post(url, data, {
        headers: {},
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
