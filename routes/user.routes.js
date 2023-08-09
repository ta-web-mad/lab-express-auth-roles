const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('../middlewares/route.guard');


//listado estudiantes
router.get('/students', isLoggedIn, (req, res) => {
    const userRoles = {
        isAdmin: req.session.currentUser?.role === 'PM',
    }

    //role base rendering??
    //res.send('hi')
    //res.render('/user')

    User
        .find()
        .then((studentList) => res.render('users/users-list', { studentList, userRoles }))
        .catch(err => console.log(err))
})



//listado estudiantes

router.get('/students/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then((userProfile) => {
            const isPM = req.session.currentUser?.role === 'PM'
            res.render('users/profile-page', { userProfile, isPM })
        })
        .catch(err => console.log(err))
})
//iteracion 2- que edite el administrador

router.get('/students/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then((user) => {
            res.render('users/profile-edit', user)
        })

})
router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const { username, email, description } = req.body
    User
        .findByIdAndUpdate(id, { username, email, description })
        .then((user) => res.redirect('/students'))
        .catch(err => next(err))
})

router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    // res.render(id)
    User
        .findByIdAndDelete(id)
        .then((user) => res.redirect('/students'))
        .catch(err => next(err))

})


// router.post('/students/:id', isLoggedIn, checkRoles('PM'), (req, res) => {
//     const { id } = req.params
//     const { username, email, profileImg, description, role } = req.body

//     User
//         .findByIdAndUpdate(users_id, { username, email, profileImg, description, role })
//         .then
// })



module.exports = router
