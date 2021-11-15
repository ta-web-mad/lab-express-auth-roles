const router = require("express").Router();
const { isLoggedIn } = require("../middelwares");
const Courses = require("../models/Course.model");
const { checkRol } = require("../utils");

router.get("/", isLoggedIn, (req, res) => {
  Courses.find()
    .then((result) => {
      res.render("courses/allCourses", {
        result,
        imTA: checkRol(req.session.currentUser, "TA"),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/create", isLoggedIn, (req, res) => {
  checkRol(req.session.currentUser, "TA")
    ? res.render("courses/create")
    : res.render("index");
});
router.post("/create", isLoggedIn, (req, res) => {
  checkRol(req.session.currentUser, "TA");
  Courses.create(req.body).catch((err) => console.log(err));
  Courses.find().then((result) => {
    res.render("courses/allCourses", {
      result,
      imTA: checkRol(req.session.currentUser, "TA"),
    });
  });
});
router.get("/details/:id", isLoggedIn, (req, res) => {
  imTA = checkRol(req.session.currentUser, "TA");
  Courses.findById(req.params.id)
    .then((result) => {
      res.render("courses/course-details", { result, imTA });
    })
    .catch((err) => console.log(err));
});
router.get("/delete/:id", isLoggedIn, (req, res) => {
  checkRol(req.session.currentUser, "TA")
    ? Courses.findByIdAndRemove(req.params.id)
        .then(res.redirect("/courses"))
        .catch((err) => {
          console.log(err);
        })
    : res.redirect("/iniciar-sesion");
});
module.exports = router;
