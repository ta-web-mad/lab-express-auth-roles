const router = require("express").Router()
const User = require("../models/User.model")
const { ROLES, PM, DEV, TA, STUDENT } = require('../const/user.const');
const { roleValidation, puedesPasar } = require('../middlewares/roles.middlewares')
const { checkRoleUser, checkUser } = require('../utils/checkRol.utils')

router.get('/', roleValidation(ROLES), (req, res, next) => {
    User.find({ role: STUDENT })
        .then((allUser) => {
            console.log(allUser)
            res.render('students/students', { allUser })
        })
})

router.get('/:idUser', roleValidation(ROLES), (req, res, next) => {
    let isPM = false
    let isStudent = false
    // if (req.session.user.role === PM) {
    if (checkRoleUser(req.session.user, PM)) {
        isPM = true
    }
    if (checkUser(req.session.user._id, req.params.idUser)) {
        isStudent = true
    }
    User.findById(req.params.idUser)
        .then((currentUser) => {
            // res.json({ currentUser, isPM })
            res.render('students/students-details', { currentUser, isPM, isStudent })
        })
        .catch((err) => next(err))
})

router.get('/:idUser/edit', (req, res, next) => {
    if (req.params.idUser === req.session.user._id || req.session.user.role === PM) {
        let isPM = false
        // if (req.session.user.role === PM) {
        if (checkRoleUser(req.session.user, PM)) {
            isPM = true
        }
        User.findByIdAndUpdate(req.params.idUser)
            .then((userForUpDate) => {
                res.render('students/students-edit', { userForUpDate, isPM, })
            })
            .catch((err) => next(err))
    } else {
        res.render('auth/login', {
            errorMessage: 'No tienes permisos'
        })
    }
})







router.post("/:idUser/delete", roleValidation([PM]), (req, res, next) => {
    User.findByIdAndRemove(req.params.idUser)
        .then(() => res.redirect("/students"))
        .catch((err) => res.render('dontPass'))
})




router.post("/:idUser/edit", roleValidation([PM]), (req, res, next) => {
    const { username, email, profileImg, description, role } = req.body
    User.findByIdAndUpdate(req.params.idUser, { username, email, profileImg, description, role })
        .then((user) => res.redirect(`/students/${user._id}`))
        .catch((err) => res.render('dontPass'))
})


module.exports = router
