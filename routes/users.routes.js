const router = require("express").Router()
const { isLoggedIn } = require("../middleware/route-guard");
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { itIsTheStudent, isPm, } = require("../utils");

//List of students

router.get('/lista-estudiantes', isLoggedIn, (req, res, next) => {
    console.log(itIsTheStudent)
    User
        .find({ role: "STUDENT" })
        .then(users => res.render('auth/student-list', { users }))
        .catch(err => console.log(err))
})

router.get('/lista', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('auth/list', { users }))
        .catch(err => console.log(err))
})






//Student details
router.get('/students/:_id', isLoggedIn, (req, res, next) => {


    const { _id } = req.params
    const currentUserId = _id
    const loggedUserId = req.session.currentUser._id

    User
        .findById(_id)
        .then(users => res.render('auth/student-details',
            {
                users,
                isPm: isPm(req.session.currentUser),


            }

        ))
        .catch(err => console.log(err))

    console.log('1-----------1')
    console.log(currentUserId)
    console.log('2-----------2')
    console.log(loggedUserId)


})

//Delete student
router.post('/students/:_id/delete', (req, res, next) => {

    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/lista-estudiantes'))
        .catch(err => console.log(err))

});



//Edit student

router.get('/editar/:_id', (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(users => res.render('auth/student-edit', users))
        .catch(err => console.log(err))

})

router.post('/editar/:_id', (req, res, next) => {

    const { _id } = req.params

    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(_id, { username, email, profileImg, description, role })
        .then(() => res.redirect('/lista-estudiantes'))
        .catch(err => console.log(err))

})


//To TA


router.post("/students/:_id/toTA", (req, res, next) => {

    const { _id } = req.params


    User
        .findByIdAndUpdate(_id, { role: 'TA' })
        .then(() => res.redirect('/lista-estudiantes'))
        .catch(err => console.log(err))

})

//To dev


router.post("/students/:_id/toDEV", (req, res, next) => {

    const { _id } = req.params


    User
        .findByIdAndUpdate(_id, { role: 'DEV' })
        .then(() => res.redirect('/lista-estudiantes'))
        .catch(err => console.log(err))

})












module.exports = router
