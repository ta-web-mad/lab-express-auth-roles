const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const { isLoggedIn } = require('./../middlewares')

const mongoose = require('mongoose')
const { isStudent, isBoss } = require('./../utils')


// Endpoints
router.get('/', (req, res) => res.render('pages/index'))

// Students list

router.get('/students', (req, res) => {

    User
        .find()
        .then(allStudents => res.render('pages/students', {allStudents,isStudent: isStudent(req.session.currentUser), isBoss: isBoss(req.session.currentUser)}))
        .catch(err => console.log('Error!', err))
})




module.exports = router
