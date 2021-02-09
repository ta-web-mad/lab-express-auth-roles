const express = require('express')
const router = express.Router()
const {response} = require('express');
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10


const {checkLoggedIn, checkRole} = require('../middleware')
const {isAdmin} = require('../utils');
const { find } = require('../models/user.model');

// Endpoints
router.get('/', (req, res) => res.render('index'))
router.get('/mi-perfil', checkLoggedIn, checkRole('BOSS', 'USER'), (req, res) => res.render('profile', {user: req.user, isAdmin: isAdmin(req.user) }))
router.get('/admin-page', checkLoggedIn, checkRole('BOSS'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))
router.get('/guest-page', checkLoggedIn, checkRole('BOSS'), (req, res) => res.send('Acceso autorizado porque eres ' + req.user.role))

//List
router.get('/editor-page/', checkLoggedIn, checkRole('BOSS'), (req, res) => {
    
    User
        .find()
        .then(list => res.render('private/list', {list}))
        .catch(err => console.log(err))
})

module.exports = router
