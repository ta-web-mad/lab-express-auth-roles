const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'

const isOwner = (id, sessionId) => id === sessionId




module.exports = { isPM, isOwner }