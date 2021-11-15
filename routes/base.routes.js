const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRoles } = require("../middlewares")
const { isPM } = require("../utils")


router.get("/", (req, res, next) => {
  res.render("index")
})

// router.get("/user-list", isLoggedIn, (req, res, next) => {

//   User.find()
//     .then(allUsers => res.render("user-list", { allUsers }))
//     .catch(err => console.log(err))

// });

router.get("/user-list", isLoggedIn, (req, res, next) => {

  User.find()
    .then(allUsers => res.render("user-list",
      {
        loggedUser: req.session.currentUser,
        allUsers,
        isPM: isPM(req.session.currentUser)
      }))

});

module.exports = router
