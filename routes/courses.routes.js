const router = require("express").Router();
const { checkRole } = require("../middlewares/route-guard");
const Course = require("../models/Course.model");
const User = require("../models/User.model");

router.get("/create", checkRole("TA"), async (req, res, next) => {
  try {
    const dbUsers = await User.find();
    console.log(`db Users: ${dbUsers}`);
    res.render("courses/create-course", { dbUsers });
  } catch (error) {
    res.render("error", { error });
  }
});

router.post("/create", checkRole("TA"), async (req, res, next) => {
  try {
    await Course.create(req.body);
  } catch (error) {
    res.render("error", { error });
  }
});

module.exports = router;
