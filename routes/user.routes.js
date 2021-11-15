const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { isLoggedIn, checkRoles } = require("../middlewares");
const { isPm } = require("../utils");

router.get("/students", (req, res, next) => {
  User.find().then((allUsers) => {
    res.render("students-list", { allUsers });
  });
});

router.get("/students/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    res.render("student-detail", {
      loggedUser: req.session.currentUser,
      //isPm: req.session.currentUser.role === "PM",
      isPMrorOWN: req.session.currentUser.role === "PM" || user.id == req.session.currentUser._id,
      user: user,
      // isOwn: user.id == req.session.currentUser._id,
    });
  });
});

module.exports = router;
