const mongoose = require("mongoose")
const PM = user => user.role === "PM"
const user = (user, currentUser) => user._id == currentUser._id

module.exports = { PM, user }