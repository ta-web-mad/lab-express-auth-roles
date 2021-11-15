const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { isLoggedIn, checkRoles } = require("../middlewares");

router.get("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id).then(res.render("index"));
});

router.get("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    res.render("edit-user", user);
  });
});

router.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const { username, profileImg, description, role } = req.body;
  User.findByIdAndUpdate(id, { username, profileImg, description, role }).then(res.redirect("/"));
});

module.exports = router;
