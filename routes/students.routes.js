const router = require("express").Router()
const User = require('./../models/User.model')
const {isLoggedIn, checkId, checkRoles} = require("./../middleware")

router.get('/', (req, res) => {
    User
        .find({role: 'Student'})
        .select('username')
        .then((user) => res.render('students/students', {user}))
        .catch(err => console.log(err))
});

router.get("/:studentId", isLoggedIn, (req, res) => {
  User
    .findById(req.params.studentId)
    .then((user) => res.render('students/profile', {user, isPM: req.session.currentUser?.role === 'PM'}))
    .catch((err) => console.log(err))
});

router.get('/:id/edit-profile', isLoggedIn, checkRoles('PM'), (req, res) => {
  const {id} = req.params
  User
    .findById(id)
    .then(student => res.render('students/edit-profile', student))
    .catch(err => console.log(err))
})

router.post('/:id/edit-profile', isLoggedIn, (req, res) => {
  const {id} = req.params
  const {username, name, description, role} = req.body
  User
    .findByIdAndUpdate(id, {username, name, description, role}, {new: true})
    .then(student => res.redirect(`/students/${student._id}`))
    .catch(err => console.log(err))
})

router.post('/:id/delete', isLoggedIn, (req, res) => {
    const {id} = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))
})


router.get('/edit-profile', isLoggedIn, (req, res) => {
    res.render('/edit-profile', {user: req.session.currentUser})
})

module.exports = router