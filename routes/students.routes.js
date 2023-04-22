const router = require("express").Router();
//const { findById } = require("../models/User.model");
const Users = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const { isLoggedIn } = require("../middlewares/route-guard");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const students = await Users.find();
    res.render("students", { students });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.render("userDetails", { user });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    console.log(user);
    res.render("auth/form-edit", { user });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    if (user.userPwd) {
      bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(user.userPwd, salt))
        .then(async (hashedPassword) => {
          await Users.findByIdAndUpdate(req.params.id, {
            ...user,
            password: hashedPassword,
          });
          res.redirect("/");
        });
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
