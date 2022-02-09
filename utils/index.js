const mongoose = require("mongoose");

const isPM = (user) => user.role === "PM";
const isTA = (user) => user.role === "TA";
const isDev = (user) => user.role === "DEV";
const isStudent = (user) => user.role === "STUDENT";

module.exports = { isPM, isTA, isDev, isStudent };
