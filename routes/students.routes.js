const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middleware/route-guard')


router.get('/students-list', isLoggedIn, (req, res,) => {

    User
        .find()
        .then(students => res.render('students/studentslist', {
            students,

            isPM: req.session.currentUser.role === 'PM'
        }

        ))

        .catch(err => console.log(err))
})

router.get('/students/:user_id', isLoggedIn, (req, res,) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(studentDetails => res.render('students/students-profile', studentDetails))
        .catch(err => console.log(err))
})

router.get('/students/:user_id/edit', (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(editstudent => res.render('students/update-student', editstudent))
        .catch(err => console.log(err))

});


router.post('/students/:user_id/edit', (req, res,) => {
    const { username, email, description } = req.body;
    const { user_id } = req.params;

    User
        .findByIdAndUpdate(user_id, { username, email, description })
        .then(() => res.redirect('/students-list'))
        .catch(err => console.log(err));
});

router.post('/students/:user_id/delete', (req, res,) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students-list'))
        .catch(err => console.log(err));

});




module.exports = router