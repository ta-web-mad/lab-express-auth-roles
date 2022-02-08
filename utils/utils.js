const mongoose = require("mongoose");

const isPM = (user) => user.role === "PM";
const isStudent = (user) => user.role === "STUDENT";
const isTA = (user) => user.role === "TA";
const isDEV = (user) => user.role === "DEV";
const checkIfStudent = (urlid, userid) => userid === urlid;

// En la ruta hay q llamar a esta función, y serán los valores id y req.session.currentUser._id para luego comparar en la ruta

module.exports = { isPM, isStudent, isTA, isDEV, checkIfStudent };
