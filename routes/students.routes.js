const router = require("express").Router();
const User = require("../models/User.model");
const { isLoggedIn, checkRoles } = require("../middleware");

router.get("/", (req, res) => {
  User.find().then((students) =>
    res.render("students/list-students", {
      students,
      isPM: req.session.currentUser?.role == "PM",
    })
  );
});

router.get("/profile/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((student) =>
      res.render("students/details-student", {
        student,
      })
    )
    .catch((err) => console.log(err));
});

router.post("/profile/delete/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// Formulario de edición: renderizado, protegida solo para usuarios logueados Y ADEMÁS solo usuario con rol PM o LT
router.get("/edit/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((student) => res.render("students/edit-student", { student }))
    .catch((err) => console.log("ENTRO EL CATCH!!!" + err));
});

// Formulario de edición: gestión, protegida solo para usuarios logueados
router.post("/edit/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  User.findByIdAndUpdate(id, { username }, { new: true })
    .then(() => res.redirect("/"))
    .catch((err) => console.log("ENTRO EN EL CATCH DE REDIRECT" + err));
});

router.post("/edit/role/dev/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { role: "DEV" }, { new: true })
    .then(() => res.redirect("/students"))
    .catch((err) => console.log(err));
});

router.post("/edit/role/ta/:id", isLoggedIn, checkRoles("PM"), (req, res) => {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { role: "TA" }, { new: true })
    .then(() => res.redirect("/students"))
    .catch((err) => console.log(err));
});

module.exports = router;
