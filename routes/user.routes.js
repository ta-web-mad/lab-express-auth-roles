const express = require('express')
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const router = express.Router()
const User = require('../models/User.model')


router.get('/students', (req,res,next) => {

    User
        .find()
        .then ((students) =>{
            res.render('student/students', { students})
        })
        .catch(error => next(error))
})


router.get('/students/:id', isLoggedIn, (req,res,next) => {

    const userRoles ={
        isPm: req.session.currentUser._id === 'PM'
    }

    const {id} = req.params
    
    User
    .findById(id)
    .then(student => {
        res.render('student/details', {student, userRoles})
    })
    .catch(err => next(err))
    })

router.get('/students/:id', (req, res) => {

    Book
        .find()
        .then(student => res.render('student/details',
            {
                student: student,
                isPm: req.session.currentUser.role === 'PM',
            }
        ))
        .catch(err => console.log(err))
})


router.get('/students/:id/edit', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res) => {
    const { id } = req.params
    if(req.session.currentUser._id === id){
        User
        .findById()
        .then(user => res.render('student/edit', user))
    }
    else{
        res.redirect('/')
    }
})





module.exports = router