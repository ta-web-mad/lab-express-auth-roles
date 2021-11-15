const mongoose = require("mongoose")

module.exports = {
  checkMongoID: id => mongoose.Types.ObjectId.isValid(id),

  isPM: (user) => user.role === "PM",
  isSelf: (user) => use.isSelf?.equals(user._id),
}