const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')

// Students List 

router.get('/students-list', (req, res) => {

    User
        .find()
        .then(students => {
            res.render('students/students-list', { students })
        })
        .catch(err => console.log(err))
})

// Student Profile 
router.get('/profile/:user_id', (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(student => {
            console.log({
                isSTUDENT: req.session.currentUser.role
            })
            res.render('students/student-profile', {
                student,
                isPM: req.session.currentUser.role === 'PM',
                isDEV: req.session.currentUser.role === 'DEV',
                isSTUDENT: req.session.currentUser.role === 'STUDENT'
            })
        })
        .catch(err => console.log(err))
});


// Edit Student (render)
router.get('/profile/:user_id/edit', (req, res) => {

    // res.send('hola')

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(student => {
            res.render('students/edit-student-profile', student)
        })
        .catch(err => console.log(err))
});

// Edit Student (handle)

router.post('/:user_id/edit', (req, res) => {
    // console.log('entro aqui')
    // res.send('hola')

    const { username, email, profileImg, description } = req.body
    const { user_id } = req.params

    User
        .findOneAndUpdate(user_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/profile/${user_id}`))
        .catch(err => console.log(err))
})


// Delete Student (handle)

router.post('/:user_id/delete', (req, res) => {

    const { user_id } = req.params

    User

        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students/students-list'))
        .catch(err => console.log(err))

});

// Edit Role -TA

router.post('/profile/:user_id/ta', (req, res) => {
    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: "TA" })
        .then(() => res.redirect(`/students/profile/${user_id}`))
        .catch(err => console.log(err))
});

// Edit Student Role (handle)

router.post('/profile/:user_id/developer', (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { role: "DEV" })
        .then(() => res.redirect(`/students/profile/${user_id}`))
        .catch(err => console.log(err))
});

module.exports = router
// ******** Prevent access to these routes for any non logged visitor********// Como es la ruta del edit?

