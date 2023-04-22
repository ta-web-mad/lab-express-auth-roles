const router = require("express").Router();

const User = require("../models/User.model");
const { isLoggedOut, isLoggedIn } = require("../middlewares/route-guard");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/students", isLoggedIn, async (req, res, next) => {
  try {
    const students = await User.find();
    res.render("students", { students });
  } catch (error) {
    res.render("error", { error });
  }
});

router.get("/students/:id", isLoggedIn, async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);
    res.render("user-profile", { student });
  } catch (error) {
    res.render("error", { error });
  }
});

module.exports = router;
