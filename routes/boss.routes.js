const express = require('express')
const User = require('../models/user.model')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')




module.exports = router