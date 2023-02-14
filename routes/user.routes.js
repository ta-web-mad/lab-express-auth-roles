const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')


router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('user/students', { users }))
        .catch(err => next(err))

})

router.get('/students/:user_id', isLoggedIn, (req, res, next) => {

    // console.log(req.params)
    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/student-profile', {
            user,
            isOwner: req.session.currentUser?._id === user_id,
            isPM: req.session.currentUser?.role === "PM",
        }))
        .catch(err => next(err))

})

router.get('/student-edit/:user_id', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('user/student-edit', user))
        .catch(err => next(err))
})

router.post('/student-edit', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {

    const { username, email, profileImg, description, user_id } = req.body
    // console.log(req.body) recuerda colocar en la vista la propiedad de id type hidden
    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description })
        .then(user => res.redirect(`/students/${user_id}`))
        .catch(err => next(err))
})

router.post('/delete/:user_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    // console.log(req.params)
    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/user/:user_id/promote/:role', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { user_id, role } = req.params

    User
        .findByIdAndUpdate(user_id, { role })
        .then(user => res.redirect(`/students/${user_id}`))
        .catch(err => next(err))
})



module.exports = router