const router = require("express").Router()

const { setRandomFallback } = require("bcryptjs")
const User = require("../models/User.model");
const { isLoggedIn, checkRoles } = require('../middleware/routes-guard');
const { findById } = require("../models/User.model");


router.get("/list", isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(user => {
            res.render('students/students-list', { user })

        })
        .catch(err => console.log(err))
})

router.get("/details/:student_id", isLoggedIn, (req, res, next) => {


    const { student_id } = req.params
    // console.log({ isPm: req.session.currentUser.role })

    User
        .findById(student_id)
        .then(studentId => {
            res.render('students/students-details', {
                studentId,
                isPm: req.session.currentUser.role === 'PM'
            })
        })
        .catch(err => console.log(err))


})



router.get('/edit/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            res.render('students/students-edit', student)
        })
        .catch(err => console.log(err))
})



router.post('/edit/:student_id', (req, res) => {

    const { username, email, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { username, email, description })
        .then(() => {
            res.redirect('/students/list')
        })
        .catch(err => console.log(err))
})

router.post('/delete/:student_id', (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

})

router.post('/:student_id/updaterole/:role', (req, res) => {
    const { student_id, role } = req.params


    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect(`/students/details/${student_id}`))
        .catch(err => console.log(err))
})
























module.exports = router