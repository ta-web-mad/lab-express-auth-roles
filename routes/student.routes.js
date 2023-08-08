const express = require('express');
const router = express.Router();

const User = require('../models/User.model')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');


//list
router.get('/list', isLoggedIn, (req, res) => {

    User
        .find()
        .then(users => res.render('student/list', { users }))
        .catch(err => console.log(err))
})

router.get('/:user_id', isLoggedIn, checkRoles('PM', "STUDENT"), (req, res) => {

    const { user_id } = req.params

    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM',
        isStudentId: req.session.currentUser?._id === user_id
    }
    if (userRoles.isPm || userRoles.isStudentId) {
        User
            .findById(user_id)
            .then(user => res.render('student/profile', { user, userRoles }))
            .catch(err => console.log(err))
    }
    else
        res.redirect('/student/list')



})


// edit
router.get("/edit/:user_id", isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render("student/edit", user))
        .catch(err => console.log(err))
})

router.post('/edit/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { username, role, email, description } = req.body

    User
        .findByIdAndUpdate(user_id, { username, role, email, description })
        .then(user => res.redirect(`/student/${user._id}`))
        .catch(err => console.log(err))
})


// Delete
router.post('/delete/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/student/list'))
        .catch(err => console.log(err))
})


//toDev
router.post('/todeveloper/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { role } = req.body


    User
        .findByIdAndUpdate(user_id, { role: "DEV" })
        .then(user => res.redirect(`/student/${user._id}`))
        .catch(err => console.log(err))
})


//toTA
router.post('/toTA/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(user_id, { role: 'TA' })
        .then(user => res.redirect(`/student/${user._id}`))
        .catch(err => console.log(err))
})
module.exports = router