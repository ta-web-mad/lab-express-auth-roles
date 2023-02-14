const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRole } = require('../middlewares/route-guard.js')


router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(createdUser => {
            res.render('./students/students-list', { createdUser })
            console.log(createdUser)
        })
        .catch(error => next(error))
})

router.get("/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params

    // res.send('estoy')

    User
        .findById(id)
        .then(user => res.render('./students/profile', {
            user,
            isPM: req.session.currentUser?.role === 'PM'
        }))
        .catch(error => next(error))
})

router.get("/edit/:id", isLoggedIn, checkRole('PM', 'STUDENT', 'TA'), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render('students/edit', user))
        .catch(error => next(error))
})

router.post("/edit", isLoggedIn, checkRole('PM', 'STUDENT', 'TA'), (req, res, next) => {

    console.log('entro aqui???')
    const { id, username, email, profileImg, description, role } = req.body
    console.log(req.body)

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(user => res.redirect(`/students/${user._id}`))
        .catch(error => next(error))

})

router.post("/delete/:id", checkRole('PM'), (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('./students-list'))
        .catch(err = next(err))
})

router.post("/changeroleta/:id", checkRole('PM'), (req, res, next) => {

    const { id, role } = req.params

    User

        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('./students-list'))
        .catch(err = next(err))


    console.log(req.body)

})

router.post("/changeroledev/:id", checkRole('PM'), (req, res, next) => {

    const { id, role } = req.params

    User

        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('./students-list'))
        .catch(err = next(err))


    console.log(req.body)

})



module.exports = router
