const { capitalizeText, checkMongoID, isAdmin, isOwner } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
const router = require("express").Router();

router.get("/students", isLoggedIn, (req, res) => {

    User.find()
      .then(allStudents => res.render("students/student-list", { allStudents }))
      .catch(err => console.log(err))

});