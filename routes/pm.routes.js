const express = require('express');
const router = express.Router();

// require the Drone model here

const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')


router.post('/students/:id/delete', isLoggedIn, checkRole("PM"), (req, res, next) => {
    // res.send("funciona")
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))

});

router.post('/students/:id/delete', isLoggedIn, checkRole("PM"), (req, res, next) => {
    // res.send("funciona")
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))

});

router.get('/students/:id/edit', isLoggedIn, checkRole("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('students/editStudents', student)
        })
        .catch(err => console.log(err))
});

router.post('/students/:id/edit', isLoggedIn, checkRole("PM"), (req, res, next) => {

    const { id } = req.params
    const { username, email, description } = req.body

    if (req.session.currentUser.roles == 'PM' || req.session.currentUser._id == id) {


        User
            .findByIdAndUpdate(id, { username, email, description })
            .then(() => {
                res.redirect(`/students`)
            })
            .catch(err => {
                console.log(err)
            })
    }
});
router.post('/students/:id/edit/TA', isLoggedIn, checkRole("PM"), (req, res, next) => {

    const { id } = req.params


    User
        .findByIdAndUpdate(id, { roles: 'TA' })
        .then(() => {
            res.redirect(`/students`)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/students/:id/edit/DEV', isLoggedIn, checkRole("PM"), (req, res, next) => {

    const { id } = req.params


    User
        .findByIdAndUpdate(id, { roles: 'DEV' })
        .then(() => {
            res.redirect(`/students`)
        })
        .catch(err => {
            console.log(err)
        })
});





module.exports = router
