const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'
const isTA = user => user.role=== 'TA'
module.exports = { isPM,isTA }