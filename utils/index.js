const mongoose = require('mongoose')

const isPm = user => user.roles.includes('PM')

const isCurrent =(user,req) => user._id == req.session.currentUser._id

module.exports = {isPm,isCurrent}