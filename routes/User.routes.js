const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { checkRoles, isLoggedIn, onlyStudent } = require('../middlewares/route.guard');
//const { route } = require("./auth.routes")



router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: "STUDENT" })
        .then(users => res.render('students', { users }))
        .catch(err => console.log(err))

})


router.get('/detailsStudents/:user_id', isLoggedIn, (req, res, next) => {

    const { user_id } = req.params

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM',
        isSTUDENT: req.session.currentUser?.role === 'STUDENT'
    }

    User
        .findById(user_id)
        .then(user => res.render('detailsStudents', { user, userRoles }))
        .catch(err => console.log(err))

})


// Edit get


router.get("/PmEdit/:user_id", isLoggedIn, checkRoles('PM'), (req, res) => {


    const { user_id } = req.params


    User
        .findById(user_id)
        .then(user => res.render("PmEdit", user))
        .catch(err => console.log(err))

})


// Edit post
router.post('/PmEdit/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { username, email, profileImg, description } = req.body


    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description })
        .then(user => res.redirect(`/PmEdit/${user._id}`))
        .catch(err => console.log(err))

})

// Delete 
router.post('/delete/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})


//change Rol

router.post('/TA/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params
    const { role } = req.body



    User
        .findByIdAndUpdate(user_id, { role })
        .then(user => res.redirect('/students'))
        .catch(err => console.log(err))
})


router.post('/DEV/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { user_id } = req.params
    const { role } = req.body



    User
        .findByIdAndUpdate(user_id, { role })
        .then(user => res.redirect('/students'))
        .catch(err => console.log(err))
})




router.get("/edit_EO/:user_id", isLoggedIn, (req, res) => {


    const { user_id } = req.params


    User

        .findById(user_id)
        .then(user => res.render("PmEdit", user))
        .catch(err => console.log(err))


})



module.exports = router