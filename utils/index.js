const mongoose = require("mongoose")

module.exports = {
    isPM: (user) => user.role === "PM",
    //isOwner: (student, user) => student.isOwner?.equals(user._id),
}