const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const {checkLoggedIn, checkRole} = require ('../middleware/index') 
const {isBoss} =require('../utils')

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/boss/index', checkLoggedIn, (req, res) => { res.render('.boss/index', {user: req.user, isBoss: isBoss(req.user)})})
router.get('/boss/boss-page', checkLoggedIn, (req, res) => { res.render('./boss-page', {user: req.user, isBoss: isBoss(req.user)})})




module.exports = router
