const router = require("express").Router()
const { isLoggedIn, checkRole } = require("../middleware/route-guard")
const User = require('./../models/User.model')
const { isPM, isDEV, isTA } = require('./../utils')

router.get("/", (req, res, next) => {
  res.render("index")
})

// Students list
router.get("/students", isLoggedIn, (req, res, next) => {

  User
    .find()
    .then(allStudents => res.render('students-list', { allStudents }))
    .catch(err => next(err))

})

// Student details
router.get('/students/:id', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
    .then(student => res.render('student-details', {
      student,
      isPM: isPM(req.session.currentUser),

    }))
    .catch(err => console.log(err))
})

//Remove student if logged in as PM
router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndDelete(id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))

})


// Edit students 1 (render)
router.get('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(student => res.render('edit-student', {
      student,
      isPM: isPM(req.session.currentUser),
    }))
    .catch(err => console.log(err))

})

// Edit students 2 (handler)
router.post('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})

// Router to set role to TA
router.post('/students/:id/TA', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndUpdate(id, { role: 'TA' })
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})

// Router to set role to DEV
router.post('/students/:id/DEV', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndUpdate(id, { role: 'DEV' })
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})




module.exports = router
