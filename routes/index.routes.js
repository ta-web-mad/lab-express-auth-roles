const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');

router.get("/", (req, res, next) => {
  res.render("index")
})

// Students List

router.get('/students', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

  // const userID = req.session.currentUser?._id

  const userRoles = {
    isPM: req.session.currentUser?.role === 'PM',
    isStudent: req.session.currentUser?.role === 'STUDENT',
  }

  User
    .find({ role: 'STUDENT' })
    .then(users => {
      res.render('auth/student-list', { users, userRoles });
    })
    .catch(err => console.log(err));
});

// Student Details
router.get('/students/:id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
  const { id } = req.params
  const userRoles = {
    isPM: req.session.currentUser?.role === 'PM'
    // isSameID: req.session.currentUser?.id === id
  }


  User
    .findById(id)
    .then(user => res.render('auth/student-details', { user, userRoles }))
    .catch(err => console.log(err));
});

// // Edit User (RENDER)
// router.get('/edit-student/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
//   const { id } = req.params


//   User
//     .findById(id)
//     .then(user => res.render('auth/edit-user', user))
//     .catch(err => console.log(err))
// });

// Edit User (RENDER)
router.get('/edit-student/:id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
  const { id } = req.params
  console.log('this is the current logged users id', req.session.currentUser?.id)


  User
    .findById(id)
    .then(user => res.send(req.session.currentUser.id))
    .catch(err => console.log(err))
});


// Edit User (HANDLER)
router.post('/edit-user/:id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  const { id } = req.params
  const { username, email, profileImg, description } = req.body

  User
    .findByIdAndUpdate(id, { username, email, profileImg, description })
    .then(user => res.redirect('/students'))
    .catch(err => console.log(err))

})

//he tenido que mirar el codigo de un compañero para entender como cambiar los roles.

// Modify Role  to Developer (RENDER)
router.post('/modify-role/:id/DEVELOPER', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  const { id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(id, { role })
    .then(user => { res.redirect('/students') })
    .catch(err => console.log(err))
});


// Modify Role  to TA (HANDLER)
router.post('/modify-role/:id/TA', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  const { id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(id, { role })
    .then(user => { res.redirect('/students') })
    .catch(err => console.log(err))
})


module.exports = router
