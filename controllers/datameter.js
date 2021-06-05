const DataMeter = require("../models/dataMeter");

exports.getNamaMeter = () => {
  DataMeter.getAll((err, namaMeter) => {
    var result = [];
    var a;

    console.log(typeof result);
    if (err) console.log(err);

    //parse datanya dulu
    for (let i = 0; i < namaMeter.length; i++) {
      // console.log(namaMeter[i]);
      // console.log("Hanya .nama_meter: ", namaMeter[i].nama_meter);
      // console.log(
      //   "pakai parse dan stringify: ",
      //   JSON.parse(JSON.stringify(namaMeter[i].nama_meter))
      // );
      //result = JSON.parse(JSON.stringify(namaMeter[i].nama_meter));
      a = result.push(namaMeter[i].nama_meter);
      console.log("Nama Meter:", result[i], typeof result);
    }

    return result;
  });
};

exports.getJumlahMeter = () => {
  DataMeter.getJumlah((err, jumlahMeter) => {
    if (err) console.log(err);
    var a = JSON.parse(JSON.stringify(jumlahMeter[0].cnt));
    console.log(typeof a);
    return a;
  });
};
