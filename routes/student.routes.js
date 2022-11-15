const router = require("express").Router()
const User = require('./../models/User.model')
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard')



//Iteration #1: listado de studentes: /students

router.get("/students", isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(students => {
            res.render('students/list', { students })
        })
        .catch(err => console.log(err))
})


//Iteration #2:Grant specific privileges to the Program Manager
router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'
    const isMY = req.session.currentUser._id === id
    User
        .findById(id)
        .then(student => {
            res.render('students/profile', { student, isPM, isMY })
        })
        .catch(err => console.log(err))
})

//Iteration #3: PM role handling.Update the rol
//change to DEV
router.get('/students/editarRole/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    User
        .findById(id)
        .then(student => {
            res.render('students/editarRole', { student, isPM: req.session.currentUser.role === 'PM' })
        })
        .catch(err => console.log(err))
})

router.post('/students/editarRole/:id', isLoggedIn, (req, res, next) => {

    const { role } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})

//change to TA
router.get('/students/changToTa/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    User
        .findById(id)
        .then(student => {
            res.render('students/changToTa', { student, isPM: req.session.currentUser.role === 'PM' })
        })
        .catch(err => console.log(err))
})

router.post('/students/changToTa/:id', isLoggedIn, (req, res, next) => {

    const { role } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})




//.Edit profile

router.get('/students/editar/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(student => {
            res.render('students/edit-profile', student)
        })
        .catch(err => console.log(err))

});

router.post('/students/editar/:id', isLoggedIn, (req, res, next) => {

    const { username, email, password, profileImg, description } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { username, email, password, profileImg, description })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log(err))

})



//delete student
router.post('/students/eliminar/:id', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})



module.exports = router
