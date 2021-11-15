const mongoose = require("mongoose");

module.exports = {
  checkRol: (user, ...roles) => roles.includes(user.roles),
  isOwner: (user, student) => user._id == student._id,
};
