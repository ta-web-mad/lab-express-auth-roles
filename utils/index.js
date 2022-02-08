const mongoose = require('mongoose')


const isPM = user => user.role === 'PM'

const isStudent = (id, studentId) => id === studentId

module.exports = { isPM, isStudent }