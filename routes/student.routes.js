const router = require("express").Router()
const { isLoggedIn, checkRoles, checkId } = require("./../middleware/index")
const User = require("../models/User.model")

router.get('/', isLoggedIn, (req, res) => {


    User
        .find()
        .then(theStudents => res.render('students.views/studentslist', { theStudents, isLogged: req.session.currentUser }))
        .catch(err => console.log(err))
})

router.get('/profile/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    User
        .findById(id)
        .then(theStudent => res.render('students.views/studentprofile', { theStudent, isPM: req.session.currentUser?.role === 'PM' }))
        .catch(err => console.log(err))

})

router.post('/profile/:id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => res.redirect('/student'))
        .catch(err => console.log(err))
})

router.get('/profile/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(theStudent => res.render('students.views/student-edit', { theStudent }))
        .catch(err => console.log(err))
})

router.post('/profile/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params
    const { username, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(id, { username, profileImg, description, role }, { new: true })
        .then(() => res.redirect('/student'))
        .catch(err => console.log(err))
})

router.get('/profile/:id/:new_role', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id, new_role } = req.params

    User
        .findByIdAndUpdate(id, { role: new_role }, { new: true })
        .then(() => res.redirect('/student'))
        .catch(err => console.log(err))
})


module.exports = router