const express = require('express')
const router = express.Router()

const Student = require('./../models/user.model')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { capitalizeText, isValidIdFormat, formatValidationError, isBoss, isDev, isTA, isStudent } = require('./../utils')

const mongoose = require('mongoose')



// Students list
router.get('/', isLoggedIn, (req, res) => {

    Student
        .find()
        .then(allStudents => res.render('pages/students/index', { allStudents, msg: req.query.msg, isBoss: isBoss(req.session.currentUser)  }))
        .catch(err => console.log('Error!', err))
})


// Students details
router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    

        Student
            .findById(id)
            .then(theStudent => res.render('pages/students/show', { theStudent, isBoss: isBoss(req.session.currentUser, id) }))
            .catch(err => console.log('Error!', err))

    
})

// Student edit (get)
router.get('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { id } = req.params

    if (isValidIdFormat(id))

    Student
        .findById(id)
        .then(student => res.render('pages/students/edit', student))
        .catch(err => console.log('Error!', err))
    
})


// Student edit (post)
router.post('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { id } = req.params
    const { name, profileImg, description, role } = req.body

    Student
        .findByIdAndUpdate(id, { name, profileImg, description, role })
        .then(editStudent => res.redirect(`/students/${editStudent._id}`))
        .catch(err => console.log('Error!', err))
})

//Delete a Student
router.post('/details/:id', isLoggedIn, checkRoles('BOSS'), (req, res, next) => {

    const { id } = req.params
    console.log(req)

    

    Student
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students/index'))
        .catch(err => {
            next();
            console.log('Error!', err)
        })
     
})
module.exports = router


