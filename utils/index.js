const mongoose = require('mongoose')


const isPM = user => user.roles === 'PM'



module.exports = { isPM }