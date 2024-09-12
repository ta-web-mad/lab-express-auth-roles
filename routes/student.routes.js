const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')


router.get("/", (req, res, next) => {
  res.render("index")
})



// Students list
router.get('/list', (req, res) => {

  User
    .find()
    .select({ username: 1 })
    .then(student => {
      res.render('student/list', { student })
    })
    .catch(err => console.log(err))
})

// Students details
router.get('/details/:student_id', isLoggedIn, (req, res) => {
  const { student_id } = req.params
  User
    .findById(student_id)
    .then(student => {
      res.render('student/student-profile', {
        student,
        isPM: req.session.currentUser.role === 'PM',
        isTheStudent: req.session.currentUser._id === student_id,
      })
    })
    .catch(err => console.log(err))
})

// Edit student

router.get('/details/:student_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { student_id } = req.params

  User
    .findById(student_id)
    .then(student => {
      res.render('student/edit-student', student)
    })
    .catch(err => console.log(err))
})



router.post('/details/:student_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { username, email, profileImg, description } = req.body
  const { student_id } = req.params

  console.log(username)
  console.log(student_id)

  User
    .findByIdAndUpdate(student_id, { username, email, profileImg, description })
    .then(() => res.redirect(`/student/list`))
    .catch(err => console.log(err))
})


// Delete Student
router.post('/details/:student_id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { student_id } = req.params

  User
    .findByIdAndDelete(student_id)
    .then(() => res.redirect('/student/list'))
    .catch(err => console.log(err))

})
// Upgrade to DEV
router.post('/details/:student_id/DEV', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { student_id } = req.params

  User
    .findByIdAndUpdate(student_id, { role: 'DEV' })
    .then(() => res.redirect('/student/list'))
    .catch(err => console.log(err))

})

router.post('/details/:student_id/TA', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { student_id } = req.params

  User
    .findByIdAndUpdate(student_id, { role: 'TA' })
    .then(() => res.redirect('/student/list'))
    .catch(err => console.log(err))

})








// Edit my student profile

router.get('/details/:student_id/edit-me', isLoggedIn, (req, res, next) => {

  const { student_id } = req.params
  if (req.session.currentUser._id === student_id) {
    User
      .findById(student_id)
      .then(student => {
        res.render('student/edit-me', student)
      })
      .catch(err => console.log(err))
  } else {
    res.redirect('/student/list')
  }

})



router.post('/details/:student_id/edit-me', isLoggedIn, (req, res) => {

  const { username, email, profileImg, description } = req.body
  const { student_id } = req.params

  if (req.session.currentUser._id === student_id) {
    User
      .findByIdAndUpdate(student_id, { username, email, profileImg, description })
      .then(() => res.redirect(`/student/list`))
      .catch(err => console.log(err))
  } else {
    res.redirect('/student/list')
  }

})
module.exports = router