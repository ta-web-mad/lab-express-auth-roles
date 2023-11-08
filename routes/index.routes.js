const router = require("express").Router()

const User = require('./../models/User.model')
const { isLoggedIn, checkRole } = require('./../middleware/route-guards')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/students', (req, res) => {

  User
    .find()
    .then(user => res.render('auth/list', { user }))
    .catch(err => console.log(err))
})

module.exports = router
router.get('/students', (req, res) => {

  User
    .find()
    .then(user => res.render('auth/list', { user }))
    .catch(err => console.log(err))
})




router.get('/students/:id', (req, res) => {




  const { id } = req.params

  User
    .findById(id)
    .then(user => res.render('auth/student', { user }))
    .catch(err => console.log(err))
})




router.get('/students/:id/editar', (req, res) => {



  const { _id } = req.params


  User
    .findById(_id)
    .then(user => res.render('auth/edit', { user }))

})









//   Edit book form (handler)
//   router.post('students/:id/editar', isLoggedIn, (req, res) => {

//     const { username, description, imageUrl, password } = req.body
//     const { _id } = req.params

//     User
//       .findByIdAndUpdate(_id, { username, description, imageUrl, password })
//       .then(() => res.redirect(`/students/details/${id}`))
//       .catch(err => console.log(err))
//   })






// })

// module.exports = router
