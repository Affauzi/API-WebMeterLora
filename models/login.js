const sql = require("./database");
var sha256 = require("js-sha256");
const crypto = require("crypto");

// constructor
const LoginUser = function (user) {
  this.No_Meter = user.No_Meter;
  this.nama = user.nama;
  this.password = user.password;
  this.status = user.status;
};

LoginUser.getAll = (dataUser, result) => {
  sql.query(
    "SELECT * FROM uimeter_user where no_meter=? and password = ?",
    dataUser,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    }
  );
};

LoginUser.create = (dataUser = [no_meter, password], result) => {
  //console.log(dataUser);
  sql.query(
    "SELECT * FROM uimeter_user where no_meter=? and password=?",
    dataUser,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      const no_Meter_Form = dataUser[0];
      const password_Form = dataUser[1];
      const no_Meter_DB = JSON.parse(JSON.stringify(res[0])).no_meter;
      const password_DB = JSON.parse(JSON.stringify(res[0])).password;

      if (no_Meter_Form == no_Meter_DB && password_Form == password_DB) {
        console.log("Berhasil Login");
        //   }
        //   if (no_Meter_Form && no_Meter_Form != no_Meter_DB) {
        //     console.log("No_Meter Salah");
        //   }
        //   if (password_Form && password_DB != password_Form) {
        //     console.log("Password Salah");
      }

      //   console.log("dataUser:", dataUser[0]);
      //   console.log("res: ", JSON.parse(JSON.stringify(res[0])).no_meter);
      //console.log("User Logged In: ", { ...dataUser });
      result(null, { ...dataUser });
    }
  );
};

module.exports = LoginUser;
