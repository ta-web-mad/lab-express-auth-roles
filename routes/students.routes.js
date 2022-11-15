const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/listado', isLoggedIn, (req, res) => {

    User
        .find()
        .then(user => {
            res.render('user/students', { user })
        })
        .catch(err => console.log(err))
})

router.get('/profile/:user_id', isLoggedIn, (req, res) => {
    //res.send("Juan")
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/profile', {
                user,
                isDEV: req.session.currentUser.role === 'DEV',
                isTA: req.session.currentUser.role === 'TA',
                isPM: req.session.currentUser.role === 'PM'
            })
        })
        .catch(err => console.log(err))
})

router.get('/user/edit/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/edit', user)
        })
        .catch(err => console.log(err))
})

router.post('/user/edit/:user_id', (req, res) => {

    const { username, email, description, role } = req.body
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, description, role })
        .then(() => res.redirect(`/students/profile/${user_id}`))
        .catch(err => console.log(err))
})

router.post('/delete/:user_id', (req, res) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/user/students'))
        .catch(err => console.log(err))
})

router.get('/updateRole/:role/:user_id', (req, res) => {
    const { role } = req.params
    const { user_id } = req.params
    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/students/listado'))
        .catch(err => console.log(err))
})



module.exports = router