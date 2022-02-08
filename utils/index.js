const mongoose = require("mongoose")


const isPM = user => user.role === "PM"
const owner = (user, currentUser) => user._id == currentUser._id

module.exports = { isPM, owner }