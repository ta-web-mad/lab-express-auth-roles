const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model");
const { isPM, isDev, isTA, isStudent } = require("../utils");

// listado estudiantes

router.get("/", isLoggedIn, (req, res, next) => {
  User.find().then((user) => {
    res.render("student/student-view", { user });
  });
});

// detalles estudiantes

router.get("/detalles/:_id", isLoggedIn, (req, res, send) => {
  const { _id } = req.params;

  User.findById(_id)
    .then((student) =>
      res.render("student/student-detail", {
        student,
        user: req.session.currentUser,
        isPM: isPM(req.session.currentUser),
        // isStudent: isStudent(req.session.currenUser),
      })
    )
    .catch((err) => console.log(err));
});

// editar detalles estudiantes PM

router.get("/detalles/:id/editar", isLoggedIn, (req, res, send) => {
  const { id } = req.params;

  User.findById(id)
    .then((student) => res.render("student/student-edit", student))
    .catch((err) => console.log(err));
});

router.post("/detalles/:id/editar", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  const { email, username, profileImg, description } = req.body;

  User.findByIdAndUpdate(
    id,
    { email, username, profileImg, description },
    { new: true }
  )
    .then(() => res.redirect("/estudiantes"))
    .catch((err) => console.log(err));
});

// eliminar estudiante PM

router.post("/detalles/:id/eliminar", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then(() => res.redirect("/estudiantes"))
    .catch((err) => console.log(err));
});

// cambiar rol a TA

router.post("/detalles/:id/cambiarTA", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { role: "TA" }, { new: true })
    .then(res.redirect(`/estudiantes/detalles/${id}`))
    .catch((err) => console.log(err));
});

// cambiar rol a DEV

router.post("/detalles/:id/cambiarDEV", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { role: "DEV" }, { new: true })
    .then(res.redirect(`/estudiantes/detalles/${id}`))
    .catch((err) => console.log(err));
});

module.exports = router;
