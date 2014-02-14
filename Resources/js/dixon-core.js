var dixonConstants = new Array();
dixonConstants['95_3'] = 0.970
dixonConstants['95_3'] = 0.970
dixonConstants['95_4'] = 0.829
dixonConstants['95_5'] = 0.710
dixonConstants['95_6'] = 0.628
dixonConstants['95_7'] = 0.569

dixonConstants['95_8'] = 0.608
dixonConstants['95_9'] = 0.564
dixonConstants['95_10'] = 0.530
dixonConstants['95_11'] = 0.502
dixonConstants['95_12'] = 0.479

dixonConstants['95_13'] = 0.611
dixonConstants['95_14'] = 0.586
dixonConstants['95_15'] = 0.565
dixonConstants['95_16'] = 0.546
dixonConstants['95_17'] = 0.529
dixonConstants['95_18'] = 0.514
dixonConstants['95_19'] = 0.501
dixonConstants['95_20'] = 0.489
dixonConstants['95_21'] = 0.478
dixonConstants['95_22'] = 0.468
dixonConstants['95_23'] = 0.459
dixonConstants['95_24'] = 0.451
dixonConstants['95_25'] = 0.443
dixonConstants['95_26'] = 0.436
dixonConstants['95_27'] = 0.429
dixonConstants['95_28'] = 0.423
dixonConstants['95_29'] = 0.417
dixonConstants['95_30'] = 0.412

//99% constants
dixonConstants['99_3'] = 0.994
dixonConstants['99_4'] = 0.926
dixonConstants['99_5'] = 0.821
dixonConstants['99_6'] = 0.740
dixonConstants['99_7'] = 0.608

dixonConstants['99_8'] = 0.717
dixonConstants['99_9'] = 0.672
dixonConstants['99_10'] = 0.635
dixonConstants['99_11'] = 0.605
dixonConstants['99_12'] = 0.579

dixonConstants['99_13'] = 0.697
dixonConstants['99_14'] = 0.670
dixonConstants['99_15'] = 0.647
dixonConstants['99_16'] = 0.627
dixonConstants['99_17'] = 0.610
dixonConstants['99_18'] = 0.594
dixonConstants['99_19'] = 0.580
dixonConstants['99_20'] = 0.567
dixonConstants['99_21'] = 0.555
dixonConstants['99_22'] = 0.544
dixonConstants['99_23'] = 0.535
dixonConstants['99_24'] = 0.526
dixonConstants['99_25'] = 0.517
dixonConstants['99_26'] = 0.510
dixonConstants['99_27'] = 0.502
dixonConstants['99_28'] = 0.495
dixonConstants['99_29'] = 0.489
dixonConstants['99_30'] = 0.483

/*
Class model
*/
function Dixon() {
    this.values = new Array();
    this.removed = new Array();
    console.log("Dixon Object initialized")
}

Dixon.prototype.addValue = function (value) {
    if (this.values.indexOf(value) == -1) {
        this.values.push(value);
    }
}

Dixon.prototype.removeValueAt = function (index) {
    if (this.values.length != 0) {
        this.removed.push(this.values.splice(index, 1)[0]);
    }
}

Dixon.prototype.removeValue = function (value) {
    var index = this.values.indexOf(value);
    if (index != -1) {
        this.removed.push(this.values.splice(index, 1)[0]);
    }
}

Dixon.prototype.getValueAt = function (index) {
    return this.values[index];
}

Dixon.prototype.getFirstValue = function () {
    return this.getValueAt(0);
}

Dixon.prototype.removeFirstValue = function () {
    this.removeValueAt(0);
}

Dixon.prototype.getLastValue = function () {
    return this.getValueAt(this.values.length - 1);
}

Dixon.prototype.removeLastValue = function () {
    this.removeValueAt(this.values.length - 1);
}

Dixon.prototype.sortValues = function () {
    this.values.sort(function (a, b) {
        return a - b
    });
}

Dixon.prototype.getN = function () {
    return this.values.length;
}

Dixon.prototype.clear = function () {
    this.values.splice(0);
}

/*
Class exception
*/

function DixonException(message) {
    this.message = message;
    this.name = "Chemis Dixon Exception";
}

/*
Class control
*/
function DixonControl() {}

DixonControl.approved = function approved(value, percent, dixon) {
    return (value < dixonConstants["" + percent + "_" + dixon.getN()]);
}

//lower end functions
DixonControl.getLowerEnd3_7 = function (values) {
    return (values[1] - values[0]) / (values[values.length - 1] - values[0]);
}

DixonControl.getLowerEnd8_12 = function (values) {
    return (values[1] - values[0]) / (values[values.length - 2] - values[0]);
}

DixonControl.getLowerEnd13 = function (values) {
    return (values[2] - values[0]) / (values[values.length - 3] - values[0]);
}

//Upper end functions
DixonControl.getUpperEnd3_7 = function (values) {
    return (values[values.length - 1] - values[values.length - 2]) / (values[values.length - 1] - values[0]);
}

DixonControl.getUpperEnd8_12 = function (values) {
    return (values[values.length - 1] - values[values.length - 2]) / (values[values.length - 1] - values[1]);
}

DixonControl.getUpperEnd13 = function (values) {
    return (values[values.length - 1] - values[values.length - 3]) / (values[values.length - 1] - values[2]);
}

DixonControl.recursiveCalc = function (dixonObj, resultsObj) {
    var lowerEnd = 0;
    var upperEnd = 0;

    if (dixonObj.getN() < 3) {
        throw new DixonException("'n' is lower than 3");
    } else if (dixonObj.getN() >= 3 && dixonObj.getN() <= 7) {
        lowerEnd = DixonControl.getLowerEnd3_7(dixonObj.values);
        upperEnd = DixonControl.getUpperEnd3_7(dixonObj.values);
    } else if (dixonObj.getN() >= 8 && dixonObj.getN() <= 12) {
        lowerEnd = DixonControl.getLowerEnd8_12(dixonObj.values);
        upperEnd = DixonControl.getUpperEnd8_12(dixonObj.values);
    } else if (dixonObj.getN() >= 13) {
        lowerEnd = DixonControl.getLowerEnd13(dixonObj.values);
        upperEnd = DixonControl.getUpperEnd13(dixonObj.values);
    }

    if (DixonControl.approved(lowerEnd, resultsObj.percent, dixonObj)) {
        resultsObj.lowerEnd = lowerEnd;
    } else {
        dixonObj.removeFirstValue();
        resultsObj.lowerEnd = DixonControl.recursiveCalc(dixonObj, resultsObj).lowerEnd;
    }

    if (DixonControl.approved(upperEnd, resultsObj.percent, dixonObj)) {
        resultsObj.upperEnd = upperEnd;
    } else {
        dixonObj.removeLastValue();
        resultsObj.upperEnd = DixonControl.recursiveCalc(dixonObj, resultsObj).upperEnd;
    }

    return resultsObj;
}

DixonControl.calc = function (dixonObj, percent) {
    dixonObj.sortValues();
    var resultsObj = JSON.parse('{"lowerEnd":0,"upperEnd":0,"percent":' + percent + '}');
    return DixonControl.recursiveCalc(dixonObj, resultsObj);
}