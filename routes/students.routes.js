const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require("./../models/user.model")
const { isLoggedIn, checkRoles, checkEditCapability } = require("./../middlewares/index")
const { isBoss, isSameUser, isStudent, canEdit } = require("./../utils/index")


// Student list
router.get('/', isLoggedIn, (req, res) => {

    User
        .find()
        .then(allStudents => res.render("pages/students/index", { allStudents, isBoss: isBoss(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})


// Student details GET
router.get('/:student_id', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(theStudent => res.render("pages/students/details", { theStudent, isBoss: isBoss(req.session.currentUser), isSameUser: isSameUser(req.session.currentUser, student_id), canEdit: canEdit(req.session.currentUser, student_id) }))
        .catch(err => console.log('Error!', err))

})


// Edit GET
router.get('/edit/:student_id', isLoggedIn, checkEditCapability(), (req, res) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render('pages/students/edit', { student: student, isRoleStudent: isStudent(student), isBoss: isBoss(req.session.currentUser), isSameUser: isSameUser(req.session.currentUser, student_id) }))
        .catch(err => console.log('Error!', err))
})


// Edit POST
router.post('/edit/:student_id', isLoggedIn, checkEditCapability(), (req, res) => {

    const { student_id } = req.params
    let { name, description, image, role, password } = req.body

    let updateFields = { name, description, image }

    if (role) {
        updateFields.role = role
    }

    if (password) {
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)
        updateFields.password = hashPass
    }

    User
        .findByIdAndUpdate(student_id, updateFields)
        .then(editedStudent => res.redirect(`/students/${editedStudent._id}`))
        .catch(err => console.log('Error!', err))
})


// Delete POST
router.post('/delete/:student_id', isLoggedIn, checkRoles("BOSS"), (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect(`/students/index`))
        .catch(err => console.log('Error!', err))
})


module.exports = router