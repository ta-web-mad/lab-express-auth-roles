// const { is } = require("express/lib/request")
const { isLoggedIn, checkRole } = require("../middleware/route-guard")

const router = require("express").Router()

const User = require("../models/User.model")

const { isPM, isCurrentStudent } = require("../utils")

// Student's List
router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: { $ne: 'PM' } })
        .then(students => {
            res.render('students/students-list-page', { students })
        })
        .catch(err => console.log(err))
})

// Student's profile
router.get("/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('students/student-profile-page', {
                student,
                projectManager: isPM(req.session.currentUser),
                user: req.session.currentUser, isCurrentStudent:
                    isCurrentStudent(id, req.session.currentUser._id)
            })
        })
        .catch(err => console.log(err))
})

// Delete Student
router.post("/:id/delete", isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

// Update Student -- ONLY PM
router.get("/:id/edit", isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('students/edit-student-page', student))
        .catch(err => console.log(err))
})

router.post('/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

// Mark Student as DEV
router.post("/:id/student-to-dev", isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

// Mark Student as TA
router.post("/:id/student-to-ta", isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))
})

// Student edit
router.get("/:id/edit-my-profile", isLoggedIn, (req, res, next) => {
    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('students/edit-my-profile-page', student))
        .catch(err => console.log(err))
})

router.post("/:id/edit-my-profile", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImg, description } = req.body


    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))


})


module.exports = router