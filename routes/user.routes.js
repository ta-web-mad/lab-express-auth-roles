const router = require("express").Router()
const User = require('../models/User.model')
const { isLoggedIn, isLoggedOut, checkRoles, checkStudent } = require('../middlewares/route-guards')

//All users list *only studeents*
router.get("/students", isLoggedIn, (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
    }

    User
        .find()
        .sort({ username: 1 })
        .then(users => res.render("user/student-list", { users, userRole }))
        .catch(err => console.log(err))

})

//Profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
})


//Student details
router.get("/students/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params


    User
        .findById(id)
        .then(student => res.render("user/student-details", student))
        .catch(err => console.log(err))

})

// student delete by PM
router.post("/students/:id/delete", isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//students edit by PM
router.get("/students/:id/edit", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params


    User
        .findById(id)
        .then(student => res.render('user/student-edit', student))
        .catch(err => console.log(err))
})

//students edit by PM(handler)
router.post("/students/:id/edit", isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})

//student to DEV
router.post('/students/:id/dev', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params



    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//student to TA
router.post('/students/:id/ta', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params


    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

//edit del profile by PM and by user
router.get("/students/:id/profile", isLoggedIn, checkStudent, (req, res, next) => {

    const { id } = req.params


    User
        .findById(id)
        .then(student => res.render('user/profile-user-pm', student))
        .catch(err => console.log(err))
})

//edit del profilee by PM and by user (handler)
router.post("/students/:id/profile", isLoggedIn, checkStudent, (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})

module.exports = router