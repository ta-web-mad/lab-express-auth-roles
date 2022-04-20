const router = require('express').Router()

const User = require('../models/User.model')

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')
//checkRole('PM', 'STUDENT', 'TA', 'DEV'),

router.get('/private', isLoggedIn, (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'
    //const isUser = req.session.currentUser._id === req.params.id

    User
        .find({ role: 'STUDENT' })
        .then(user => {

            res.render('private', { user, isPM, currentUser: req.session.currentUser })

        })
        .catch(err => console.log(err))

})



router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isUser = req.session.currentUser._id === id
    //res.send(isUser)

    User
        .findById(id)
        .then(student => {
            res.render('student-details', { student, isUser })
        })
        .catch(err => console.log(err))




})

router.post('/delete/:id', checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    //res.send(req.params)

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/private')
        })
        .catch(err => console.log(err))
})




router.get('/edit/:id', checkRole('PM', 'STUDENT'), (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'

    const { id } = req.params
    //res.send(req.params)

    User
        .findById(id)
        .then(student => {
            res.render('edit-student', student)
        })
        .catch(err => console.log(err))
})

router.post('/edit/:id', checkRole('PM', 'STUDENT'), (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'

    const { id } = req.params
    const { username, email, description, profileImg } = req.body

    User
        .findByIdAndUpdate(id, { username, email, description, profileImg })
        .then(() => {

            res.redirect('/private')

        })
        .catch(err => console.log(err))
})

router.post('/update-role/:id', checkRole('PM'), (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'

    const { id } = req.params
    const { role } = req.body
    //res.send(req.body)

    User
        .findByIdAndUpdate(id, { role })
        .then(() => {

            res.redirect('/private')

        })
        .catch(err => console.log(err))
})


router.get('/create-courses', checkRole('TA'), (req, res, next) => {

    res.render('create-courses')


})

module.exports = router

