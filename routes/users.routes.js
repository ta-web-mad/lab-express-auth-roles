const router = require("express").Router();
const Users = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const { isLoggedIn, checkRole } = require("../middlewares/route-guard");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.render("users", { users });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    console.log(req.session);
    res.render("userDetails", {
      user,
      canEdit:
        req.session.currentUser &&
        (["PM"].includes(req.session.currentUser.role) ||
          req.session.currentUser.email == user.email),
      canDelete:
        req.session.currentUser &&
        ["PM"].includes(req.session.currentUser.role),
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["PM", "STUDENT"])],
  async (req, res, next) => {
    try {
      const user = await Users.findById(req.params.id);
      if (
        user.email == req.session.currentUser.email ||
        req.session.currentUser.role == "PM"
      ) {
        res.render("auth/form-edit", {
          user,
          canEditPM:
            req.session.currentUser &&
            ["PM"].includes(req.session.currentUser.role),
        });
      } else {
        res.render("auth/login", { errorMessage: "No tienes permisos." });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id/edit",
  [isLoggedIn, checkRole(["PM", "STUDENT"])],
  async (req, res, next) => {
    try {
      const user = req.body;
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
      } else {
        await Users.findByIdAndUpdate(req.params.id, {
          ...req.body,
        });
        res.redirect("/");
      }
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id/delete",
  [isLoggedIn, checkRole(["PM"])],
  async (req, res, next) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
