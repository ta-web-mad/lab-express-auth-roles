const mongoose = require("mongoose")

module.exports = {
  cleanText: text => text.trim(),
  capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  checkMongoID: id => mongoose.Types.ObjectId.isValid(id),

  isPm: (user) => user.role === "PM",
  
  isOwner: (student, user) => student.id === user._id,
}