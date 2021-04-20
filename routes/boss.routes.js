const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const { isBoss } = require('./../utils')


const mongoose = require('mongoose')



// delete student


router.post('/student/:student_id/delete', (req, res, next) => {

    const {student_id} = req.params

    User
        .findByIdAndRemove(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => {next(); return err;})
})

// edit student

router.get('/student/student_id/edit', (req, res, next) => {

    const {student_id} = req.params

    User
        .findById(student_id)
        .then(theStudent => res.render('pages/auth/edit', theStudent))
        .catch(err => {
            next();
            return err;
        })
})

router.post('/student/:student_id/edit', (req, res, next) => {

    const { student_id} = req.params
    const {username} = req.body

    User
        .findByIdAndUpdate(student_id, {username})
        .then(() => res.redirect('/pages/students'))
        .catch(err => {
            next();
            return err;
        })
})

module.exports = router