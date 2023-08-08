const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn } = require("../middlewares/route-protect")


//EDIT
router.get('/students/:users_id/edit', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findById(users_id)
        .then(student => res.render('students/student-edit', student))
        .catch(err => console.log(err))

})

router.post('/students/:users_id/edit', isLoggedIn, (req, res) => {

    const { users_id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(users_id, { username, email, profileImg, description, role })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})


//DELETE
router.post('/students/:users_id/delete', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findByIdAndDelete(users_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})


// UPGRADE
router.post('/students/:users_id/upgradeDEV', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findByIdAndUpdate(users_id, { role: "DEV" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))

})

router.post('/students/:users_id/upgradeTA', isLoggedIn, (req, res) => {

    const { users_id } = req.params

    User
        .findByIdAndUpdate(users_id, { role: "TA" })
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))

})


module.exports = router