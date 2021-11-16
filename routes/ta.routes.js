const { isLoggedIn, checkRoles } = require("../middlewares");
const User = require("../models/User.model")
const { isTA } = require("../utils")

const router = require("express").Router();

/* GET home page */
router.get("/students", isLoggedIn, checkRoles("TA"), (req, res, next) => {

  User.find()
    .then(allStudents => res.render("admin/admin-page",
      {
        loggedUser: req.session.currentUser,
        allStudents,
      }))

});




module.exports = router;