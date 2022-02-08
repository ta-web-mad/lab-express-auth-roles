const router = require('express').Router()
const User = require('../models/User.model')
const { logged } = require('./../middleware/route-guard')
const { isPM, isStudent, isTA, isDEV, checkIfStudent} = require('../utils')

router.get("/", (req, res, next) => res.render("index"))

router.get('/students', logged, (req, res, next) => {
    User
        .find()
        .then(students => res.render('users/students', { students }))
        .catch(err => console.log(err))
});

router.get('/students/:id', logged, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(students => res.render("users/students-profile", {
            students, isPM: isPM(req.session.currentUser),
            checkIfStudent: checkIfStudent(id, req.session.currentUser._id),
        }))
        .catch(err => console.log(err))
  });

router.get('/students/:id/edit', logged, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(students => res.render('users/edit-student', students))
        .catch(err => console.log(err))
});

router.post('/students/:id/edit', logged, (req, res, next) => {
    const { id } = req.params
    const { username, email, description } = req.body
    User
        .findByIdAndUpdate(id, { username, email, description }, { new: true })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
  
});

router.post('/students/:id/delete', logged, (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
});

router.get('/students', logged, (req, res, next) => {
    res.render('users/students', {
        user: req.session.currentUser,
        isPM: isPM(req.session.currentUser),
        isTA: isTA(req.session.currentUser),
        isDEV: isDEV(req.session.currentUser),
        isStudent: isStudent(req.session.currentUser)
    })
})

module.exports = router;