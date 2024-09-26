const mongoose = require('mongoose')


const isStudent = user=> user.role === 'STUDENT'
const isDev = user => user.role ==='DEV'
const isTA = user => user.role === 'TA'
const isPM = user => user.role === 'PM'
const isSameStudent = (id1, id2) => id1 === id2


module.exports= {isStudent, isDev, isTA, isPM, isSameStudent}