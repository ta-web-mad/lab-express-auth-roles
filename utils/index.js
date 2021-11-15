const mongoose = require("mongoose");

module.exports = {
  checkMongoID: (id) => mongoose.Types.ObjectId.isValid(id),

  isPm: (user) => user.role === "PM",

  //optional chaining, el "?" detiene la ejecución si isOwner es falsy
  //isOwner: (course, user) => course.isOwner?.equals(user._id),
};
