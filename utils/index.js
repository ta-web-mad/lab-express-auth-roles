const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    isBoss: user => user && user.role === 'BOSS',
    isDev: user => user && user.role === 'DEV',
    isTA: user => user && user.role === 'TA',
    isStudent: user => user && user.role === 'STUDENT',
    formatValidationError: err => Object.values(err.errors).map(elm => elm.message).join('<br>')
}