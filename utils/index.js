const mongoose = require('mongoose')
const checkMongoID = (id) => mongoose.Types.ObjectId.isValid(id)
const isPM = (user) => user.roles === 'PM'

module.exports = {
  isPM,
}
