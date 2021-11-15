const router = require("express").Router();
const Course = require("../models/Course.model");
const { checkMongoID, isPM, isOwner, formatDate } = require("../utils");
const { isLoggedIn, checkRoles } = require("../middlewares");

router.get("/courses", isLoggedIn, (req, res, next) => {
  Course.find()
    .then((courses) => {
      res.render("courses/courses", { courses });
    })
    .catch((err) => console.log(err));
});
router.get("/courses/create", checkRoles("TA"), (req, res) => {
  Course.find().then((courses) => {
    res.render("courses/create-course", { courses });
  });
});
router.post("/courses/create", checkRoles("TA"), (req, res, next) => {
  const { title, startDate, endDate, description } = req.body;
  Course.create({
    title,
    startDate,
    endDate,
    description,
  })
    //6. Decidir que vista vamos a renderizar
    .then((course) => {
      console.log(startDate);
      res.redirect("/courses");
    })
    .catch((err) => {
      res.render("courses/create-course");
      console.log(err);
    });
});

router.get("/courses/:id", checkRoles("TA"), (req, res) => {
  const courseId = req.params.id;
  Course.findById(courseId).then((course) => {
    res.render("courses/course-details", { courseDetails: course });
  });
});

router.post("/courses/:id/delete", checkRoles("TA"), (req, res) => {
  const courseID = req.params.id;
  Course.findByIdAndDelete(courseID).then((course) => {
    res.redirect("/courses");
  });
});

router.get("/courses/:id/edit", checkRoles("TA"), (req, res) => {
  const courseID = req.params.id;
  Course.findById(courseID).then((course) => {
    res.render("courses/edit-course", { course });
  });
});

router.post("/courses/:id", checkRoles("TA"), (req, res) => {
  const courseID = req.params.id;
  Course.findByIdAndUpdate(courseID, req.body).then((course) => {
    res.redirect("/courses");
  });
});

module.exports = router;
