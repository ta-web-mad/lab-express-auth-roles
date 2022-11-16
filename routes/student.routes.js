const router = require("express").Router()

const { isLoggedIn } = require("../middleware/route-guard")
const User = require("./../models/User.model")


router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find()//{ role: 'STUDENT' }))
        .then(students => {
            res.render('student/list', { students })
        })
        .catch(err => console.log(err))
})

//PROFILE

router.get("/profile/:student_id", isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {

            res.render('student/profile', {
                student,
                isPM: req.session.currentUser.role === 'PM',
                isTheStudent: req.session.currentUser._id === student_id,
            })
        })
        .catch(err => console.log(err))
})

//EDITAR USER

router.get("/profile/:student_id/editar", (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then((student) => {
            res.render('student/edit', { student, })
        })
        .catch(err => console.log(err))
})

router.post("/profile/:student_id/editar", (req, res, next) => {

    const { username, email, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { username, email, description })
        .then(() => res.redirect(`/students/profile/${student_id}`))
        .catch(err => console.log(err))
})

//DELETE ESTUDIANTE

router.post("/profile/:student_id/delete", (req, res) => {
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
})


//Change Role

router.post("/profile/:student_id/promotetoTA", (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(() => res.redirect(`/students/profile/${student_id}`))
        .catch(err => console.log(err))

})

router.post("/profile/:student_id/promotetoDEV", (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(() => res.redirect(`/students/profile/${student_id}`))
        .catch(err => console.log(err))
})


module.exports = router