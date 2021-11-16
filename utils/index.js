const mongoose = require("mongoose")

module.exports = {

  isPm: (user) => user.role === "PM",
  // optional chaining, el "?" detiene la ejecución si isOwner es falsy
  // isOwner: (book, user) => book.isOwner?.equals(user._id),
}