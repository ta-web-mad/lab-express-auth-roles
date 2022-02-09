const router = require("express").Router();
const User = require("./../models/User.model");
const { isLoggedIn, checkRole } = require("./../middleware/route-guard");
const { isAdmin, isSameUser, isStudent, isTa } = require("../utils");

router.get("/", (req, res, next) => {
  res.render("index");
});

//All users

router.get("/students", isLoggedIn, (req, res, next) => {
  User.find({ role: { $ne: "PM" } })
    .then((users) => {
      res.render("portal-students", { users });
    })
    .catch(() => next(error));
});

router.get("/students/:id/detail", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      console.log(req.session.currentUser._id);
      console.log(user._id);

      res.render("detail-student", {
        user,
        isAdmin: isAdmin(req.session.currentUser),
        isStudent: isStudent(req.session.currentUser),
        isSameUser: isSameUser(req.session.currentUser, user),
      });
    })
    .catch((error) => next(error));
});

router.get(
  "/students/:id/edit",
  isLoggedIn,
  checkRole("PM", "STUDENT", "DEV"),
  (req, res, next) => {
    const { id } = req.params;

    User.findById(id)
      .then((user) => {
        res.render("edit-student", {
          user,
          isAdmin: isAdmin(req.session.currentUser),
          isStudent: isStudent(req.session.currentUser),
          roles: [
            { name: "DEV", selected: user.role === "DEV" },
            { name: "TA", selected: user.role === "TA" },
            { name: "STUDENT", selected: user.role === "STUDENT" },
          ],
        });
      })
      .catch((error) => next(error));
  }
);

router.post(
  "/students/:id/edit",
  isLoggedIn,
  checkRole("PM", "STUDENT", "DEV"),
  (req, res, next) => {
    const { id } = req.params;
    const { username, email, role, description } = req.body;
    User.findByIdAndUpdate(id, { username, email, role, description })
      .then(() => res.redirect(`/students/${id}/detail`))
      .catch((error) => next(error));
  }
);

module.exports = router;
