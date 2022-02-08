const mongoose = require('mongoose')

const isStudent = user => user.role === 'STUDENT'
const isDev = user => user.role === 'DEV'
const isTa = user => user.role === 'TA'
const isPm = user => user.role === 'PM'

const sameUser = user => user.id === req.session.currentUser.id

module.exports = { isStudent, isDev, isTa, isPm, sameUser }
