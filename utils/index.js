const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    isAdmin: user => user && user.role === 'BOSS',
    isTa: user => user && user.role === 'TA',
}