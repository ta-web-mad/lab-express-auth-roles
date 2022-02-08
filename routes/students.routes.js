const router = require("express").Router();

const { isLoggedIn, checkRole } = require("../middleware/routeguard");
const User = require("../models/User.model");
const { isPM, checkIfStudent } = require("../utils/utils");

router.get("/students", (req, res, next) => {
  User.find()
    .then((students) => res.render("students/studentspage", { students }))
    .catch((err) => console.log(err));
});

router.get("/students/details/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((student) => {
      console.log(student);
      res.render("students/studentsdetails", {
        student,
        isPM: isPM(req.session.currentUser),
        checkIfStudent: checkIfStudent(id, req.session.currentUser._id),
      });
    })
    .catch((err) => console.log(err));
});

router.get("/students/edit-student/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((student) => res.render("students/edit-student", student))
    .catch((err) => console.log(err));
});

router.post("/students/edit-student/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  User.findByIdAndUpdate(id, { username, email, role })
    .then((student) => res.redirect("/students"))
    .catch((err) => console.log(err));
});

router.get("/students/delete-student/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((student) => res.render("students/delete-student", { student }))
    .catch((err) => console.log(err));
});

router.post("/students/delete-student/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => res.redirect("/students"))
    .catch((err) => console.log(err));
});

router.post(
  "/markasdeveloper/:id",
  isLoggedIn,
  checkRole("PM"),
  (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, { role: "DEV" }, { new: true })
      .then(() => res.redirect("/students"))
      .catch((err) => console.log(err));
  }
);

router.post("/markasta/:id", isLoggedIn, checkRole("PM"), (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { role: "TA" }, { new: true })
    .then(() => res.redirect("/students"))
    .catch((err) => console.log(err));
});

module.exports = router;
