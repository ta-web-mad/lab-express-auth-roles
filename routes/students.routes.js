const router = require("express").Router()
const User = require('../models/User.model')
const { isLoggedIn, checkRoles, checkEdit } = require('./../middleware/route-guard')


router.get("/", isLoggedIn, (req, res, next) => {

  User
    .find()
    .then(User => {
      res.render("auth/list", { User })
    })
    .catch(err => console.log(err))
})

router.get("/:stud_id", isLoggedIn, (req, res, next) => {

  const { stud_id } = req.params

  User
    .findById(stud_id)
    .then(User => {
      res.render("auth/detalles", {
        User,
        isPM: req.session.currentUser.role === 'PM',
        isStudent: req.session.currentUser.role === 'ESTUDIANTE',
        isOwner: req.session.currentUser._id === stud_id
      })
    })
    .catch(err => console.log(err))
})

//delete

router.post('/eliminar/:stud_id', (req, res, next) => {

  const { stud_id } = req.params

  User
    .findByIdAndDelete(stud_id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))

})
// Edit student form (render)
router.get('/editar/:stud_id', checkEdit, (req, res, next) => {

  const { stud_id } = req.params

  User
    .findById(stud_id)
    .then(User => {

      res.render('auth/edit', User)
    })
    .catch(err => console.log(err))
})


// Edit student form (handle)
router.post('/editar/:stud_id', checkEdit, (req, res) => {

  const { username, email, profileImg, description, password } = req.body
  const { stud_id } = req.params


  User
    .findByIdAndUpdate(stud_id, { username, email, profileImg, description, password })
    .then(() => res.redirect(`/students`))     ///*${stud_id}*/
    .catch(err => console.log(err))
})
// editar DEV
router.post('/editar/:stud_id/DEV', (req, res, next) => {

  const { role } = req.body
  const { stud_id } = req.params

  User
    .findByIdAndUpdate(stud_id, { role: 'DEV' })
    .then(() => res.redirect(`/students`))     ///*${stud_id}*/
    .catch(err => console.log(err))
})





// editar TA
router.post('/editar/:stud_id/TA', (req, res, next) => {

  const { role } = req.body
  const { stud_id } = req.params

  User
    .findByIdAndUpdate(stud_id, { role: 'TA' })
    .then(() => res.redirect(`/students`))     ///*${stud_id}*/
    .catch(err => console.log(err))
})


module.exports = router
