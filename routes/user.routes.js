const router = require("express").Router()

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');

const User = require('../models/User.model');
const { find } = require("../models/User.model");




// Listado de Estudiantes

router.get("/students", isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { student_id } = req.params

    User
    .find({ role: 'STUDENT' })
    .then((students) => res.render("students-list", {students}))
    .catch(err => console.log(err))

   
})


// Detalles del Estudiante


router.get('/students/details/:student_id', isLoggedIn, (req, res) => {

    const { student_id } = req.params
    
    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM',
        isidStudent: req.session.currentUser?._id === student_id
    }

    if (userRoles.isPm || userRoles.isidStudent) {

    User
        .findById(student_id)
        .then(student => {
            res.render('students-details', {student, userRoles})
        })
        .catch(err => console.log(err))

    } else {
        res.redirect('/iniciar-sesion?err="No tiene permisos para editar')
    }
})

// Eliminar Estudiante

router.post('/students/delete/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    
    const { id } = req.params

        User
            .findByIdAndDelete(id)
            .then(() => res.redirect('/students'))
            .catch(err => console.log(err))

    
});

// Editar Estudiante (render)

router.get('/students/edit/:student_id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res) => {

    const { student_id } = req.params

    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM',
        isidStudent: req.session.currentUser?._id === student_id
    }

   User
       .findById(student_id)
       .then(student => {
           res.render('students-edit', student)
       })
        .catch(err => console.log(err))
})  

// Editar Estudiante (handler)
router.post('/students/edit/:student_id', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { student_id } = req.params
    const { email, username, profileImg, description } = req.body

    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM'
        // isEditor: req.session.currentUser?.role === 'EDITOR'
    }

    User
        .findByIdAndUpdate(student_id, { email, username, profileImg, description })
        .then(() => res.redirect(`/students/details/${student_id}`))
        .catch(err => console.log(err))
})


// Cambiar de ROL al estudiante (DEV)

router.post('/students/details/:student_id/DEV', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { student_id } = req.params


    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM'
        // isEditor: req.session.currentUser?.role === 'EDITOR'
    }

    User
        .findByIdAndUpdate(student_id, { role : 'DEV' })
        .then(() => res.redirect(`/students/details/${student_id}`))
        .catch(err => console.log(err))
})

// CAMBIAR ROLES A TA


router.post('/students/details/:student_id/TA', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { student_id } = req.params


    const userRoles = {
        isPm: req.session.currentUser?.role === 'PM'
        // isEditor: req.session.currentUser?.role === 'EDITOR'
    }

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(() => res.redirect(`/students/details/${student_id}`))
        .catch(err => console.log(err))
})








module.exports = router