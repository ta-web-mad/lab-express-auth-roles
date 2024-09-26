const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require("../middlewares/route-guard")
const { isPM } = require("../utils/index")

router.get('/students', (req, res, next) => {
    User
        .find()
        .then(students => res.render('users/students', { students }))
        .catch(err => console.log(err))
})

router.get('/users/details/:students_id', (req, res) => {


    const { students_id } = req.params

    User
        .findById(students_id)
        .then(student => res.render('users/students-details', { student, isPM: isPM(req.session.currentUser) }))


        .catch(err => console.log(err))
})

router.get('/users/edit/:id', (req, res) => {

    const students_id = req.params.id
    console.log("that it " + req.params.id)

    console.log("this is "

        + students_id)
    User
        .findById(students_id)

        .then(student => res.render('users/edit', student))


        .catch(err => console.log(err))


})



router.post('/users/edit/:students_id', (req, res) => {

    const { username, email, description, role } = req.body

    User
        .findByIdAndUpdate(req.params.id, { username, email, description, role })
        .then(() => res.redirect('users'))


        .catch(err => console.log(err))

})




// router.post('/students', (req, res, next))




module.exports = router