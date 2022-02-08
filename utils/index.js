const mongoose = require('mongoose')

const itsMe = (id, current_id) => id === current_id
const isPM = user => user.role === 'PM'
const isStudent = user => user.role === 'STUDENT'

module.exports = { isStudent, isPM, itsMe }