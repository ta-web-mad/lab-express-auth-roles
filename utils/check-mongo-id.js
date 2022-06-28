const mongoose = require('mongoose')

const checkMongoID = id => mongoose.Types.ObjectId.isValid(id)

module.exports = checkMongoID