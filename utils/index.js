const mongoose = require('mongoose')

const checkMongoID = id => mongoose.Types.ObjectId.isValid(id)

const isStudent = user => user.role === 'Student'
const isPM = user => user.role === 'PM'

module.exports = { checkMongoID, isPM, isStudent }