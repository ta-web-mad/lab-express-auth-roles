const router = require("express").Router()
const User = require("../models/User.model")
const {isLoggedIn, checkId, checkRoles } = require("../middleware/index")

router.get("/", (req, res) => {
    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('students-list', { students, isLogged: req.session.currentUser }))
        .catch(err => console.log(err))
})

router.get('/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    console.log('NO ARRIESGO =====>', id)
    
    User
      .findById(id)
      .then(theStudent => res.render('student-profile', {theStudent}))
      .catch(err => console.log(err))
  })
module.exports = router