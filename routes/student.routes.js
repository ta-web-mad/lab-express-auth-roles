const express = require('express');
const { isValidIdFormat, isBoss } = require('../utils');
const router = express.Router();
const { isLoggedIn, checkRoles } = require('./../middlewares')
const User = require('./../models/user.model');

router.get('/', isLoggedIn, (req, res) => {

    User.find({ role: 'STUDENT' })
        .then(allStudents => res.render('pages/students/index', { data: allStudents, isBoss: isBoss(req.session.currentUser) }))
})

router.get('/details/:id', isLoggedIn, (req, res) => {

    const id = req.params.id

    if (isValidIdFormat(id)) {
        User.findById(id).then(theUser => res.render('pages/students/show', theUser))
    }
})

router.post('/delete/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const id = req.params.id


    User.findByIdAndRemove(id).then(() => res.redirect('/students')).catch(err => console.log('Error', err))

})

router.get('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res, next) => {
    const id = req.params.id

    if (isValidIdFormat(id)) {
        User.findById(id).then(user => res.render('pages/auth/edit', user)).catch(err => console.log('Error', err))
    }
})

router.post('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res, next) => {
    const id = req.params.id

    const { username, name, profileImg, description } = req.body

    User.findByIdAndUpdate(id, { username, name, profileImg, description }).then(editedUser => res.redirect('/students'))
        .catch(err => console.log('Error!', err))
})


router.get('/edit-auth/:id', isLoggedIn, checkRoles('BOSS'), (req, res, next) => {

    const id = req.params.id
    console.log(id)
    if (isValidIdFormat(id)) {
        User.findById(id).then(user => res.render('pages/auth/edit-auth', user)).catch(err => console.log('Error', err))
    }

})

router.post('/edit-auth/:id', isLoggedIn, checkRoles('BOSS'), (req, res, next) => {
    const id = req.params.id

    let { role } = req.body

    if (isValidIdFormat(id)) {
        User.findByIdAndUpdate(id, { role }).then(res.redirect('/')).catch(err => console.log('Error', err))
    }
})


module.exports = router;