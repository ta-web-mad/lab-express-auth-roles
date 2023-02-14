const router = require("express").Router()
const { isLoggedIn, checkRole, PMorOwn, } = require("../middlewares/route-guard")
const { checkIsPM } = require("../utils/checkIsPM")
const { checkIfOwn } = require("../utils/checkIfOwn")

const User = require("./../models/User.model")

router.get("/", isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then(students => res.render("students/students-list", { students }))

})

router.get('/edit/:student_id', isLoggedIn, PMorOwn, (req, res, next) => {
    const { student_id } = req.params
    User
        .findById(student_id)
        .then(student => res.render('students/edit-form', student))
        .catch(err => next(err))
})

router.post('/edit/:student_id', isLoggedIn, PMorOwn, (req, res, next) => {
    const { student_id } = req.params
    for (let key in req.body) {
        if (req.body[key] === "") delete req.body[key]
    }
    User
        .findByIdAndUpdate(student_id, { ...req.body })
        .then(student => res.redirect('/students/'))
        .catch(err => next(err))
})

router.post('/delete/:student_id', checkRole('PM'), (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/:role/:student_id', checkRole('PM'), (req, res, next) => {
    const { role, student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

router.get('/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            const isPM = checkIsPM(req.session.currentUser.role)
            const own = checkIfOwn(req.session.currentUser, student)
            res.render('students/profile', { student, isPM, own })
        })
        .catch(err => next(err))
})

module.exports = router
