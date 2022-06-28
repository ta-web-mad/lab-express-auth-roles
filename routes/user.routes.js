const router = require('express').Router()

const { isLoggedIn, checkRole } = require('../middleware/route-guard')

const User = require('../models/User.model')

router.get('/students', isLoggedIn, (req, res, next) => {
  
  const isPM = req.session.currentUser.role === 'PM'
  
  User
      .find()
      .then(students => {
        console.log(students)
        res.render('user/students', {students, isPM})
      })
      .catch(error => next(error))
  })
  
  router.get('/students/:id', isLoggedIn, (req,res,next) => {
    const {id} = req.params
    const isMe = req.session.currentUser._id === id

    User
      .findById(id)
      .then(student => {
        console.log(student)
        console.log(req.session.currentUser._id)
        console.log(id)
        console.log(isMe)
        res.render('user/studentdetails', {student, isMe})
      })
      .catch(error => next(error))
  })

  router.get('/students/:id/edit', isLoggedIn, (req,res,next) => {
    const {id} = req.params

    User
      .findById(id)
      .then(student => {
        console.log(student)
        res.render('user/editstudent', student)
      })
  })

  router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    
    const { id } = req.params
    const { email, username, profileImg, role, description } = req.body

    User
      .findByIdAndUpdate(id,{email, username, profileImg, role, description})
      .then(updatedStudent => {
        res.redirect('/students')
      })
  })

  router.get('/students/:id/edityourself', isLoggedIn, (req,res,next) => {
    const {id} = req.params

    User
      .findById(id)
      .then(student => {
        console.log(student)
        res.render('user/edityourself', student)
      })
  })

  router.post('/students/:id/edityourself', isLoggedIn, (req, res, next) => {
    
    const { id } = req.params
    const { email, username, profileImg, description } = req.body

    User
      .findByIdAndUpdate(id,{email, username, profileImg, description})
      .then(updatedStudent => {
        res.redirect('/students')
      })
  })

  router.post('/students/:id/delete', (req, res) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

  module.exports = router