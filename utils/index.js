const mongoose = require('mongoose')



// const capitalize = text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()

const cleanText = text => text.trim()

const checkMongoID = id => mongoose.Types.ObjectId.isValid(id)



const isDEV = user => user.role === 'DEV'
const isTA = user => user.role === 'TA'
const isPM = user => user.role === 'PM'
const isStudent = user => user.role === "STUDENT";
const checkIfStudent = (urlid, userid) => userid === urlid;

module.exports = { cleanText, checkMongoID, isPM, isStudent, isTA, isDEV, checkIfStudent };