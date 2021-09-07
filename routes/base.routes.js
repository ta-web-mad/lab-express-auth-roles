const { findOneAndUpdate } = require("../models/User.model")
const { isLogged, checkRoles } = require("../middleware")
const Users = require('./../models/User.model')

const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/my-profile', isLogged, (req, res) => {
  res.render('my-profile', req.session.currentUser)
})

router.get('/my-profile/edit',isLogged, (req, res) => {
  res.render('edit-my-profile', req.session.currentUser)
})

router.post('/my-profile/edit/', isLogged,(req, res) => {
  const { username, name, profileImg, description } = req.body
  const id = req.session.currentUser._id
  
  Users
    .findByIdAndUpdate(id, { username, name, profileImg, description}, {new: true})
    .then((user) => req.session.currentUser = user)
    .then((user) => res.redirect('/my-profile'))

    .catch(err => console.log('-------ERROR-------', err))


})

module.exports = router
