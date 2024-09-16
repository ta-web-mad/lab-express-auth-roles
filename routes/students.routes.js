const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get("/lista", isLoggedIn, (req, res) => {

    User
        .find()
        .then(user => {
            res.render('user/students', { user })
        })
        .catch(err => console.log(err))
})

router.get('/profile/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/Profile', {
                user,
                isAdmin: req.session.currentUser.role === 'PM',
                isOwner: req.session.currentUser._id === user_id,
            })
        })
        .catch(err => console.log(err))
})

router.get('/edit/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/edit', {
                user,
                isAdmin: req.session.currentUser.role === 'PM',


            })
        })
        .catch(err => console.log(err))
})

router.post('/edit/:user_id', (req, res) => {
    console.log('Entro aqui')
    const { username, description, role } = req.body
    console.log(req.body)

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, description, role })
        .then(() => res.redirect(`/students/profile/${user_id}`))
        .catch(err => console.log(err))
})

router.post('/eliminar/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect("/students/lista"))
        .catch(err => console.log(err))

})



module.exports = router