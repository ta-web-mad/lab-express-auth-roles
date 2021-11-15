const router = require("express").Router();
const Students = require("../models/User.model");
const { isLoggedIn } = require("../middelwares");
const { isOwner, checkRol } = require("../utils");

router.get("/", isLoggedIn, (req, res, next) => {
  Students.find()
    .then((allStudents) => {
      res.render("students/allStudents", { allStudents });
    })
    .catch((err) => console.log(err));
});

router.get("/:id", isLoggedIn, (req, res) => {
  Students.findById(req.params.id)
    .then((student) => {
      checkisPM = checkRol(req.session.currentUser, "PM");
      checkisOwner = isOwner(req.session.currentUser, student);
      console.log(checkisOwner);
      res.render("students/student-details", {
        student,
        checkisPM,
        checkisOwner,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/delete/:id", isLoggedIn, (req, res) => {
  Students.findByIdAndRemove(req.params.id)
    .then(res.redirect("/students"))
    .catch((err) => {
      console.log(err);
    });
});
router.get("/edit/:id", isLoggedIn, (req, res) => {
  checkisPM = checkRol(req.session.currentUser, "PM");
  Students.findById(req.params.id)
    .then((student) => {
      checkifPMorOwner = checkisPM || isOwner(req.session.currentUser, student);
      if (checkifPMorOwner) {
        res.render("students/edit-student", { student, checkisPM });
      } else {
        res.render("auth/login", {
          errorMessage: "Debes ser un Owner o PM para ver esta sección",
        });
      }
    })
    .catch((err) => console.log(err));
});
router.post("/edit/:id", isLoggedIn, (req, res) => {
  Students.findByIdAndUpdate(req.params.id, req.body)
    .then(res.redirect("/students"))
    .catch((err) => console.log(err));
});
module.exports = router;
