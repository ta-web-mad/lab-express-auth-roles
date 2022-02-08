const mongoose = require('mongoose')

const isPM = user => user.role === 'PM'
const isOwn = (id, current_id) => id == current_id


module.exports = {isPM, isOwn }
