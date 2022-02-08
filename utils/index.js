const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'

const isCurrentStudent = (id, userId) => id === userId

module.exports = { isPM, isCurrentStudent }