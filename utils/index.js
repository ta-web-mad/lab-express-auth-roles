const mongoose = require('mongoose')

const checkMongoID = id =>mongoose.Types.ObjectId.isValid(id)

const isTa = user => user.role ==='TA'
const isPm = user => user.role ==='PM'

module.exports = {checkMongoID, isTa, isPm}