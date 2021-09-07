const router = require("express").Router();

const users = require("./../models/User.model");
const { isLoggedIn } = require("./../middleware");
const { checkRoles } = require("./../middleware");

/*
router.get("/students", isLoggedIn, (req, res) => {
  res.render("students-profile", { user: req.session.currentUser });
});
*/
router.get("/", (req, res) => {
  users
    .find()
    .then((users) => res.render("students", { users }))
    .catch((err) => console.log(err));
});

router.get("/students-profile/:id", (req, res) => {
  const studentId = req.params.id;

  users
    .findById(studentId)
    .then((users) => res.render("students-profile", { users }))
    .catch((err) => console.log(err));
});

router.get("/edit-students/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  users
    .findById(id)
    .then((theUser) => res.render("edit-students", theUser))
    .catch((err) => console.log(err));
});

router.post("/edit-students/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  users
    .findByIdAndUpdate(id, username)
    .then((theUser) => res.redirect("students", theUser))
    .catch((err) => console.log(err));
});

module.exports = router;
