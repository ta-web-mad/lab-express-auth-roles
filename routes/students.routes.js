const router = require("express").Router()

const { isLoggedIn } = require("../middleware/route-guard")


const User = require('./../models/User.model')

router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(students => {
            res.render('list-students', { students })
        })
        .catch(err => console.log(err))
})

router.get("/student-details/:student_id", isLoggedIn, (req, res, next) => {

    const { student_id } = req.params

    // res.send(req.params)

    User
        .findById(student_id)
        .then(student => {
            // res.send({
            //     student,
            //     isPM: req.session.currentUser.role === 'PM'
            //     isSTUDENT: req.session.currentUser._id === student_id && isPM: req.session.currentUser.role === 'PM'
            // })
            // console.log({ isPM: req.session.currentUser.role })

            res.render('student-details', {
                student,
                isPM: req.session.currentUser.role === 'PM',
                isSTUDENT: req.session.currentUser._id === student_id
            })
        })
        .catch(err => console.log(err))
})


router.get("/edit-student/:student_id", isLoggedIn, (req, res, next) => {

    const { student_id } = req.params

    // res.send(req.params)

    User
        .findById(student_id)
        .then(student => {
            res.render('edit-student', student)
        })
        .catch(err => console.log(err))
})

router.post('/edit-student/:student_id', isLoggedIn, (req, res) => {

    const { email, username, profileImg, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { email, username, profileImg, description })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})

router.post('/delete/:student_id', isLoggedIn, (req, res) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.get("/newRole/:student_id/:role", isLoggedIn, (req, res, next) => {

    const { role, student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})



module.exports = router