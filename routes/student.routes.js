const router = require("express").Router()
const User = require("../models/User.model")
const checkMongoID = require("../utils/check-mongo-id")

const { checkRole } = require("./../middleware/roles-checker")

const { isLoggedIn } = require("./../middleware/session-guard")

const { rolesChecker } = require("./../utils/roles-checker")

const { canEditStudent } = require("./../middleware/can-edit-student")

router.get('/students', isLoggedIn, (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser);
    console.log("roles:", roles)
    User.find({ role: "STUDENT" })
        .then(data => {
            res.render('students/student-list', { data, roles })
        })
        .catch(err => console.log(err))
})

router.get('/users', isLoggedIn, checkRole("PM"), (req, res, next) => {
    const roles = rolesChecker(req.session.currentUser);
    console.log("roles:", roles)
    User.find()
        .then(data => {
            res.render('students/student-list', { data, roles })
        })
        .catch(err => console.log(err))
})

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const studentID = req.params.id

    const userMatch = studentID === req.session.currentUser._id

    console.log(studentID, req.session.currentUser._id)
    if (!checkMongoID(studentID)) {
        res.render('index', { errorMessage: "Invalid ID" })
    }
    const roles = rolesChecker(req.session.currentUser);
    User.findById(studentID)
        .then(data => res.render('students/student-details', { data, roles, userMatch }))
        .catch(err => console.log(err))
})


router.get('/students/:id/edit', isLoggedIn, canEditStudent(), (req, res, next) => {
    User.findById(req.params.id)

        .then(data => res.render('students/student-edit', data))
        .catch(err => res.redirect(`/students/${req.params.is}/id`, { errorMessage: err }))

})
router.post('/students/:id/edit', isLoggedIn, canEditStudent(), (req, res, next) => {
    const { id } = req.params

    User.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect('/students'))
        .catch(err => res.redirect(`/students/${req.params.is}/id`, { errorMessage: err }))


})

router.post('/students/:id/delete', checkRole("PM"), (req, res, next) => {
    const { id } = req.params
    User.findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))


})

router.post('/students/:id/changeRole/:role', isLoggedIn, checkRole("PM"), (req, res, next) => {
    const { id, role } = req.params

    User.findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))


})


module.exports = router
