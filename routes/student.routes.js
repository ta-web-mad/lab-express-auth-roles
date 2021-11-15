const router = require("express").Router();
const User = require("../models/User.model");
const { checkMongoID, isPM, isTA, isOwner } = require("../utils");
const { isLoggedIn, checkRoles, isOwn } = require("../middlewares");

router.get("/students", isLoggedIn, (req, res, next) => {
  User.find()
    .then((allStudents) => {
      res.render("students/students", { allStudents });
    })
    .catch((err) => console.log(err));
});

router.get("/students/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  if (!checkMongoID(id)) {
    res.render("students/students-profile", {
      errorMessage: "Este libro no existe en la DB",
    });
  }
  User.findById(id)
    .then((student) => {
      res.render("students/students-profile", {
        isPM: isPM(req.session.currentUser),
        isTA: isTA(req.session.currentUser),
        isOwner: isOwner(student, req.session.currentUser),
        student,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/students/:id/delete", checkRoles("PM"), (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id).then(() => {
    res.redirect("/students");
  });
});

router.get("/students/:id/edit", checkRoles("PM"), (req, res) => {
  const { id } = req.params;
  User.findById(id).then((student) => {
    res.render("students/edit-student", {
      isPM: isPM(req.session.currentUser),
      student,
    });
  });
});

router.get("/students/:id/edit-my-profile", isOwn, (req, res) => {
  const { id } = req.params;
  User.findById(id).then((student) => {
    res.render("students/edit-student", {
      isPM: isPM(req.session.currentUser),
      isOwner: isOwner(student, req.session.currentUser),
      student,
    });
  });
});

router.post("/students/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body).then(() => {
    console.log(req.body);
    res.redirect("/students");
  });
});

module.exports = router;
