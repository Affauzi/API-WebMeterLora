const sql = require("./database");
var sha256 = require("js-sha256");
const crypto = require("crypto");

// constructor
const Users = function (user) {
  this.No_Meter = user.No_Meter;
  this.nama = user.nama;
  this.password = user.password;
  this.status = user.status;
};

Users.getAll = (result) => {
  sql.query("SELECT * FROM uimeter_user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Users.create = (dataUser, result) => {
  sql.query("INSERT INTO uimeter_user SET ?", dataUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { ...dataUser });
    result(null, { ...dataUser });
  });
};

Users.findById = (No_Meter, result) => {
  console.log("no_meter: ", No_Meter);
  sql.query(
    `SELECT * FROM uimeter_user WHERE no_meter = ${No_Meter}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("User No Meter: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Users;
