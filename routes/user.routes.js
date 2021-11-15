const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares");
const { isPM } = require("../utils");
const User = require("../models/User.model");

router.get("/perfil", isLoggedIn, (req, res, next) => {
  const { currentUser } = req.session;

  res.render("user/profile", currentUser);
});

router.get("/students", (req, res) => {
  User.find()
    .then((data) => res.render("user/students-list", { data }))
    .catch((err) => console.log(err));
});

router.get("/student/:id", (req, res) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .then((data) => res.render("user/student", { data, isPM: isPM(req.session.currentUser) }))
    .catch((err) => console.log(err));
});

router.get("/student/:id/edit", (req, res, next) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .then((data) => res.render("user/edit-student", { data }))
    .catch((err) => console.log(err));
});

router.post("/student/:id/edit", (req, res, next) => {
  const { username, role } = req.body;
  const { id } = req.params;

  User.findOneAndUpdate({ _id: id }, { username, role }, { new: true })
    .then(() => res.render("index"))
    .catch(() => res.redirect("index"));
});

module.exports = router;
