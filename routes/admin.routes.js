const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const User = require('../models/user.model')


// User list
router.get('/admin', (req, res) => {

    User
        .find()
        .then(users => {
            res.render('admin/index', { users })
        })
        .catch(err => console.log(err))
})


// User details 
router.get('/all-users-details/:user_id', (req, res) => {

    const user_id = req.params.user_id

    User
        .findById(user_id)
        .then(us => {
            res.render('admin/infouser', us)
        })
        .catch(err => console.log(err))

})


//Add new user 
router.get('/users/add-new-user', (req, res) => res.render('admin/adduser'))

router.post('/add-new-user', (req, res) => {

    const { username, name, profileImg, description, facebookId, role } = req.body

    User
        .create({ username, name, profileImg, description, facebookId, role })
        .then(user => res.redirect('/admin'))
        .catch(err => console.log(err))
})


// Delete new form
router.post('/user/:user_id/delete', (req, res) => {

    const user_id = req.params.user_id

    User
        .findByIdAndRemove(user_id)
        .then(us => res.redirect('/admin'))
        .catch(err => console.log(err))
})

//Edit user form
router.get('/users/:user_id/edit', (req, res) => {

    const user_id = req.params.user_id

    User
        .findById(user_id)
        .then(user => res.render('admin/edit', user))
        .catch(err => console.log(err))
})

router.post('/admin/:user_id/edit', (req, res) => {

    const { username, name, profileImg, description, facebookId, role } = req.body
    const user_id = req.params.user_id

    User
        .findByIdAndUpdate(user_id, { username, name, profileImg, description, facebookId, role })
        .then(user => res.redirect(`/all-users/${user._id}`))
        .catch(err => console.log(err))
})



module.exports = router