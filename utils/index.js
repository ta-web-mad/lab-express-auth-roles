const mongoose = require("mongoose");

const checkMongoID = (id) => mongoose.Types.ObjectId.isValid(id);

const isAdmin = (user) => user.role === "PM";
const isStudent = (user) => user.role === "STUDENT";
const isDev = (user) => user.role === "DEV";
const isTa = (user) => user.role === "TA";
const isSameUser = (user1, user2) => String(user1._id) === String(user2._id);

module.exports = { checkMongoID, isAdmin, isSameUser, isDev, isStudent, isTa };
