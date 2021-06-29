const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('./../models/user.model')
const { checkLoggedUser, checkRoles } = require('./../middleware')


// Books list
router.get('/', checkLoggedUser, (req, res) => {

    const isAdmin = req.session.currentUser?.role === 'ADMIN'

    User
        .find()
        .select('name')
        .then(students => res.render('student/student-list', { students, isAdmin }))
        .catch(err => console.log(err))
})


// Book details
router.get('/detalles/:student_id', (req, res) => {

    const { book_id } = req.params

    const isAdmin = req.session.currentUser?.role === 'ADMIN'

    User
        .findById(book_id)
        .then(book => res.render('student/student-details', { book, isAdmin }))
        .catch(err => console.log(err))
})


// New book form: render
router.get('/crear', checkLoggedUser, (req, res) => res.render('student/student-create'))

// New book form: manage
router.post('/crear', checkLoggedUser, (req, res) => {

    const { title, author, description, rating } = req.body

    User
        .create({ title, author, description, rating })
        .then(() => res.redirect('/libros/listado'))
        .catch(err => console.log(err))
})







// Edit book form: manage
router.post('/editar', checkLoggedUser, checkRoles('ADMIN'), (req, res) => {

    const { book_id } = req.query
    const { title, author, description, rating } = req.body

    User
        .findByIdAndUpdate(book_id, { title, author, description, rating })
        .then(() => res.redirect('pm/pm-edit'))
        .catch(err => console.log(err))
})





module.exports = router