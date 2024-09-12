const router = require("express").Router();
const { STUDENT, DEV, TA, PM } = require('../const/user.const')
const User = require('../models/User.model.js')
const isLogedin = require('../middleware/is_logedin.middleware');
const { roleValidation } = require('../middleware/roles.middleware');
const { userIsPm, userIsStudent } = require('../utils/index')


/**
 * GET
 */

router.get('/students', isLogedin, (req, res, next) => {

    User.find({ role: STUDENT })
        .then((students) => {
            req.session.user
            res.render('students', { students })
        })
        .catch((err) => {
            console.error(err)
        })

})

router.get("/students/:id", (req, res, next) => {

    const { id } = req.params

    User.findById(id)
        .then((student) => {
            const isPm = userIsPm(req.session.user)
            const isStudent = student._id.toString() === req.session.user._id
            res.render('student-details', { student, isPm, isStudent })

        })
        .catch((err) => {
            next(err)
        })
})

router.get("/students/:id/edit", (req, res, next) => {
    if (req.params.id === req.session.user._id || req.session.user.role === 'PM') {

        User.findById(req.params.id)
            .then((student) => {
                res.render('student-edit', student)
            })
            .catch((err) => {
                next(err)
            })
    } else {
        res.render('auth/login', { errorMessage: 'No tiens acceso' })
    }
})


/**
 * POST
 */

router.post("/students/:id/edit", (req, res, next) => {
    const { username, email, profileImg, description, role } = req.body
    User.findByIdAndUpdate(req.params.id, { username, email, profileImg, description, role })
        .then((studentId) => res.redirect(`/students`))
        .catch((err) => next(err))
})

router.post('/students/:id/delete', roleValidation(PM), (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(() => {
            res.redirect("/students")
        })
        .catch((err) => {
            next(err)
        })
})


module.exports = router