const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

// Signup
router.get('/register', (req, res) => res.render('auth/signup'))
router.post('/register', (req, res) => {

  const { username, userPwd } = req.body

  if (userPwd.length === 0 || username.length === 0) {      
    res.render('auth/signup-form', { errorMsg: 'Fill all the fields' })
    return
  }

  User
    .findOne({ username })
    .then(user => {

      if (user) {                  
        res.render('auth/signup', { errorMsg: 'User already registered' })
        return
      }

      const bcryptSalt = 10
      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(userPwd, salt)    

      User
        .create({ username, password: hashPass })         
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})



// Login
router.get('/log-in', (req, res) => res.render('auth/login'))
router.post('/log-in', (req, res) => {

  const { username, userPwd } = req.body

  if (userPwd.length === 0 || username.length === 0) {     
    res.render('auth/login', { errorMsg: 'Fill all the fields' })
    return
  }

  User
    .findOne({ username })
    .then(user => {

      if (!user) {
        res.render('auth/login', { errorMsg: 'User not found' })
        return
      }

      if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMsg: 'Wrong password' })
        return
      }

      req.session.currentUser = user
      res.redirect('/')
    })
    .catch(err => console.log(err))

})


// Logout
router.get('/log-out', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

module.exports = router
