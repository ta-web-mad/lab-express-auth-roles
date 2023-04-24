const router = require("express").Router();
const { checkRole } = require("../middlewares/route-guard");
const Course = require("../models/Course.model");
const User = require("../models/User.model");

router.get("/create", checkRole("TA"), async (req, res, next) => {
  try {
    const dbUsers = User.findById().populate("username");
    res.render("courses/create-course", { dbUsers });
  } catch (error) {
    res.render("error", { error });
  }
});

module.exports = router;
