const mongoose = require('mongoose')


const checkMongoID = id => mongoose.Types.ObjectId.isValid(id)

const isStudent = user => user.role === 'STUDENT'
const isTA = user => user.role === 'TA'
const isPm = user => user.role === 'PM'
const itIsTheStudent = user => user._id === _id





module.exports = { checkMongoID, isStudent, isPm, isTA, itIsTheStudent }