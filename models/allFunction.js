module.exports = {
  FuncVoltage: function FuncVoltage(str) {
    var tempVol = str.slice(2, 4);
    var tempVol2 = str.slice(0, 1);
    var rounding = str.slice(1, 2);

    var finalVoltage = tempVol.concat(tempVol2, ".", rounding);
    console.log("Final Voltage: " + finalVoltage);

    return finalVoltage;
  },

  FuncCurrent: function FuncCurrent(str) {
    var tempCurr = str.slice(2, 3);
    var rounding = str.slice(3, 4);
    var rounding1 = str.slice(0, 2);

    var finalCurrent = tempCurr.concat(".", rounding, rounding1);
    console.log("FinalCurrent: " + finalCurrent);

    return finalCurrent;
  },

  FuncActiveTotal: function FuncActiveTotal(str) {
    var base = str.slice(5, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActiveTotal = base.concat(base1, ".", rounding);

    console.log("FinalActiveTotal: " + finalActiveTotal);

    return finalActiveTotal;
  },

  FuncActivePlus: function FuncActivePlus(str) {
    var base = str.slice(5, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActivePlus = base.concat(base1, ".", rounding);

    console.log("FinalActivePlus: " + finalActivePlus);

    return finalActivePlus;
  },

  FuncInstantPower: function FuncInstantPower(str) {
    var base = str.slice(5, 6);
    var rounding = str.slice(2, 4);

    var finalInstantPower = base.concat(".", rounding);
    console.log("finalInstantPower:" + finalInstantPower);

    return finalInstantPower;
  },

  FuncFrequency: function FuncFrequency(str) {
    var base = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalFrequency = base.concat(".", rounding);
    console.log("finalFrequency:" + finalFrequency);

    return finalFrequency;
  },

  FuncPowerFactor: function FuncPowerFactor(str) {
    var base = str.slice(2, 3);
    var rounding = str.slice(0, 2);

    var finalPowerFactor = base.concat(".", rounding);
    console.log("finalPowerFactor:" + finalPowerFactor);

    return finalPowerFactor;
  },

  FuncActiveMinus: function FuncActiveMinus(str) {
    var base = str.slice(5, 6);
    var base1 = str.slice(2, 4);
    var rounding = str.slice(0, 2);

    var finalActiveMinus = base.concat(base1, ".", rounding);

    console.log("FinalActiveMinus: " + finalActiveMinus);

    return finalActiveMinus;
  },
};

// module.exports = {bcdToFloat32, bcdTo10Th}
