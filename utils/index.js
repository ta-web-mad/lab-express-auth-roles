const req = require('express/lib/request')
const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'

const isTA = user => user.role === 'TA'

const isCurrentStudent = (id, userId) => id === userId


module.exports = { isPM, isCurrentStudent, isTA }