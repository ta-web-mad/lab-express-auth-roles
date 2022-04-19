const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})


router.get('/students', isLoggedIn, (req, res) => {


  User
    .find({ role: 'STUDENT' })
    .then(users => {
      res.render('students/students-list', { users })
    })
    .catch(err => console.log(err))
})

router.get('/students/details/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  const isPM = req.session.currentUser.role === 'PM'
  const isST = req.session.currentUser._id ===  id 


  User
    .findById(id)
    .then(user => {
      res.render('students/students-details', { user, isPM, isST })
    })
    .catch(err => console.log(err))
})



//EDITAR

router.get('/students/details/:id/edit', isLoggedIn, (req, res) => {

  const { id } = req.params
  User
    .findById(id)
    .then(user => {
      res.render('students/students-edit', { user })
    })
    .catch(err => console.log(err))
})

router.post('/students/details/:id/edit', isLoggedIn, (req, res) => {

  const { id } = req.params
  const { username, email, profileImg, description } = req.body

  User
    .findByIdAndUpdate(id, { username, email, profileImg, description })
    .then(user => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})


//BORRAR

router.post('/students/details/:id/delete', (req, res) => {

  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})




//CAMBIAR ROLES
router.post('/students/details/:id/editrole', isLoggedIn, (req, res) => {

  const { id } = req.params

  User
    .findByIdAndUpdate(id, { role: 'TA' })
    .then(user => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})


router.post('/students/details/:id/editrolede', isLoggedIn, (req, res) => {

  const { id } = req.params

  User
    .findByIdAndUpdate(id, { role: 'DEV' })
    .then(user => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})






module.exports = router
