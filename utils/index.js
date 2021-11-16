const mongoose = require("mongoose")

module.exports = {
    isPM: (user) => user.role === "PM",

}