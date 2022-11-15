const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')
const { findByIdAndUpdate } = require('./../models/User.model')
const User = require('./../models/User.model')
const router = require("express").Router()

router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find({ roles: 'STUDENT' })
        .then(users => {
            res.render("students", { users })
        })
        .catch(err => console.log(err))
})
router.get("/details/:users_id", isLoggedIn, (req, res, next) => {
    const { users_id } = req.params

    User
        .findById(users_id)
        .then(users => {
            res.render("student-details", {
                users,
                isPM: req.session.currentUser.roles === 'PM',
                isCurrentUser: req.session.currentUser._id === users_id
            })
        })
        .catch(err => console.log(err))
})
router.get("/edit/:users_id", isLoggedIn, (req, res, next) => {
    const { users_id } = req.params
    User
        .findById(users_id)
        .then(users => {
            res.render("students-edit", users)

        })
        .catch(err => console.log(err))
})
router.post("/edit/:users_id", isLoggedIn, (req, res, next) => {
    const { email, username, profileImg, description } = req.body
    const { users_id } = req.params

    User
        .findByIdAndUpdate(users_id, { email, username, profileImg, description })
        .then(() => res.redirect(`/students/details/${users_id}`))
        .catch(err => console.log(err))

})
router.post('/delete/:users_id', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findByIdAndDelete(users_id)
        .then(() => res.redirect('/students/list'))
        .catch(err => console.log(err))

})
router.get('/:users_id/updaterole/:roles', isLoggedIn, (req, res, next) => {
    const { roles, users_id } = req.params


    User
        .findByIdAndUpdate(users_id, { roles })
        .then(() => {
            res.redirect(`/students/list`)
        })
        .catch(err => console.log(err))
})


module.exports = router