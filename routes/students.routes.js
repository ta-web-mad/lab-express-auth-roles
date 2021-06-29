const router = require("express").Router()

const User = require('./../models/user.model')

const { checkLoggedUser, checkRoles } = require('./../middleware')

router.get('/', (req, res) => {

    const isAdmin = req.session.currentUser?.role === 'PM'

    User
        .find()
        .select('username')
        .then(student => res.render('students/students',{ student, isAdmin }))
        .catch(err => console.log(err))
})

router.get('/detalles/:student_id', (req, res) => {

    const { student_id } = req.params

    const isAdmin = req.session.currentUser?.role === 'PM'

    User
        .findById(student_id)
        .then(student => res.render('students/student-details', { student, isAdmin }))
        .catch(err => console.log(err))
})


router.get('/editar', checkLoggedUser, checkRoles('PM'), (req, res) => {

    const { student_id } = req.query
    const isAdmin = req.session.currentUser?.role === 'PM'

    User
        .findById(student_id)
        .then(student => res.render('students/edit-student', {student, isAdmin}))
        .catch(err => console.log(err))
})

router.post('/editar', checkLoggedUser, checkRoles('PM'), (req, res) => {
    const { student_id } = req.query
    const { username, role, name } = req.body

    User
        .findByIdAndUpdate(student_id, {username, role, name })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})




router.post('/eliminar', checkLoggedUser, checkRoles('PM'), (req, res, next) => {
  const { student_id } = req.query

  User
      .findByIdAndRemove(student_id)
      .then(() => res.redirect('/students'))
      .catch(err => console.error(err)) 
})

module.exports = router