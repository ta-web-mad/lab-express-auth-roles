const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middleware/route-guard')



router.get('/editar-estudiante/:student_id', isLoggedIn, checkRole('PM'), (req, res) => {
    //res.render('students/student-list', { user: req.session.currentUser })
    const { student_id } = req.params
    console.log(student_id)
    User
        .findById(student_id)
        .then(user => {

            res.render('students/student-edit', user)
        })
        .catch(err => console.log(err))

})

router.post('/editar-estudiante/:student_id', isLoggedIn, checkRole('PM'), (req, res) => {
    const { username, email, profileImg, description } = req.body
    const { student_id } = req.params
    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(() => res.redirect('/estudiantes/listado'))
        .catch(err => console.log(err))
})



router.post('/eliminar-estudiante/:student_id', isLoggedIn, checkRole('PM'), (req, res) => {

    const { student_id } = req.params
    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/estudiantes/listado'))
        .catch(err => console.log(err))
})




router.post('/change-estudiante/:student_id', isLoggedIn, checkRole('PM'), (req, res) => {
    const { role } = req.body
    const { student_id } = req.params
    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => {
            console.log(student_id, { role })
            res.redirect('/estudiantes/listado')
        })
        .catch(err => console.log(err))
})



module.exports = router


