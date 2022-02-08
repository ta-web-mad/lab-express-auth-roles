const mongoose = require('mongoose')
const isPM = user => user.role === 'PM'
const isTA = user => user.role === 'TA'
const isDEV = user => user.role === 'DEV'



module.exports = { isPM, isTA, isDEV }