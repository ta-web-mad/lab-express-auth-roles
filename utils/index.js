
const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'
const isMyProfile = (id, currentId) => id === currentId


module.exports = { isPM, isMyProfile }