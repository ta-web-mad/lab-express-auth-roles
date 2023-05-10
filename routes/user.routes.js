const router = require("express").Router();
const { isLoggedIn, checkRoles, checkSame } = require('../middlewares/route-guard')
const User = require("../models/User.model");



router.get('/students', isLoggedIn, (req, res, next) => {
    User
        .find()
        .sort({ username: 1 })
        .then(users => res.render('students/students', { users }))
        .catch(err => console.log(err))
});

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isSTU: req.session.currentUser?._id === id

    }

    User
        .findById(id)
        .then(users => res.render("students/students-details", { users, userRole }))
        .catch(err => console.log(err))

});

router.get("/students/edit/:id", isLoggedIn, checkSame, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(users => res.render("students/students-edit", users))
        .catch(err => console.log(err))
})


router.post("/students/edit/:id", isLoggedIn, checkSame, (req, res, next) => {

    const { email, username, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { email, username, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

router.post('/students/delete/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})

router.post("/students/editRoleTA/:id", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "TA" })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

router.post("/students/editRoleDev/:id", isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "DEV" })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

module.exports = router

