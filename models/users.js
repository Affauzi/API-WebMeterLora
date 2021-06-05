const sql = require("./database");

// constructor
const Users = function (user) {
  this.no_meter = user.no_meter;
  this.nama = user.nama;
  this.active = user.password;
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

module.exports = Users;
