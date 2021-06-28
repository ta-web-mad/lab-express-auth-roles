const router = require("express").Router()
const Student = require('./../models/user.model')

const { checkLoggedUser, checkRoles } = require("../middleware")

//Students list
router.get('/', checkLoggedUser, (req, res) => {

    //const isAdmin = req.session.currentUser?.role === 'ADMIN'

    Student
        .find()
        .select('username')
        .then(students => res.render('students/students-list', { students }))
        .catch(err => console.log(err))
})
module.exports = router

// Student Profile
router.get('/:id', checkLoggedUser, (req, res) => {

    const { id } = req.params
    const isPM = req.session.currentUser?.role === 'PM'
    console.log('aqui', isPM)


    //const isAdmin = req.session.currentUser?.role === 'ADMIN'

    Student
        .findById(id)
        .then(student => res.render('students/student-profile', { student, isPM }))
        .catch(err => console.log(err))
})

// Edit student form: render
router.get('/:id/edit', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { id } = req.params


    Student
        .findById(id)
        .then(student => res.render('students/student-edit', { student }))
        .catch(err => console.log(err))
})


// Edit student form: manage
router.post('/:id/edit', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    const { username, name, description, role } = req.body

    Student
        .findByIdAndUpdate(id, { username, name, description, role })
        .then((id) => {
            console.log("El ID", id)
        })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})
