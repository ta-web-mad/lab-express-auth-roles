const mongoose = require("mongoose")

const isStudent = user => user.role === "STUDENT"

const isDev = user => user.role === "DEV"

const isPm = user => user.role === "PM"

const isTa = user => user.role === "TA"

const isSameStudent = (userId, currentUserId) => userId === currentUserId


module.exports = {isStudent, isDev, isPm, isTa, isSameStudent}