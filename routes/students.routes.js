const router = require("express").Router()
const { isLogged, checkRoles } = require("../middleware")
const Users = require('./../models/User.model')

router.get('/', (req, res) => {

    Users
        .find({role: 'STUDENT'})
        .select('username')
        .then(users => res.render('students/all-students', { users }))
        .catch(err => console.log('------ERROR----', err))
})

router.get('/:id', isLogged, checkRoles('STUDENT', 'PM'), (req, res) => {

    const { id } = req.params
    
    Users
        .findById(id)
        .then(user => res.render('students/student-details',{isPM: req.session.currentUser?.role === 'PM', user}))
        .catch(err => console.log('------ERROR----', err))
})

router.get('/:id/edit', checkRoles('PM'),(req, res) => {
    const { id } = req.params
    
    Users
        .findById(id)
        .then(user => res.render('students/edit-student', user))
        .catch(err => console.log('------ERROR----', err))
})

router.post('/:id/edit', checkRoles('PM'),(req, res) => {
    const { id } = req.params
    const { username, name, profileImg, role, description } = req.body
    
    Users
        .findByIdAndUpdate(id, {username, name, profileImg, role, description}, {new: true})
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => console.log('------ERROR----', err))
    
})

router.post('/:id/delete', checkRoles('PM'),(req, res) => {
    const { id } = req.params

    Users
    .findByIdAndDelete(id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log('------ERROR----', err))
})



















module.exports = router
