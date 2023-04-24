const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const {
  isLoggedIn,
  isLoggedOut,
  checkRole,
} = require("../middlewares/login-roles");
const saltRounds = 10;

// Signup
router.get("/registro", isLoggedOut, (req, res, next) =>
  res.render("auth/signup")
);
router.post("/registro", (req, res, next) => {
  const { userPwd } = req.body;

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(userPwd, salt))
    .then((hashedPassword) =>
      User.create({ ...req.body, password: hashedPassword })
    )
    .then((createdUser) => res.redirect("/"))
    .catch((error) => next(error));
});

// Login
router.get("/iniciar-sesion", (req, res, next) => res.render("auth/login"));
router.post("/iniciar-sesion", (req, res, next) => {
  const { email, userPwd } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Email no registrado en la Base de Datos",
        });
        return;
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render("auth/login", {
          errorMessage: "La contraseña es incorrecta",
        });
        return;
      } else {
        req.session.currentUser = user;
        res.redirect("/students");
      }
    })
    .catch((error) => next(error));
});

router.get("/students", isLoggedIn, async (req, res, next) => {
  const users = await User.find();
  console.log(
    "Can edit and delete",
    req.session.currentUser && ["PM"].includes(req.session.currentUser.roles)
  );
  res.render("students/list", {
    users,
    isPM:
      req.session.currentUser && ["PM"].includes(req.session.currentUser.roles),
  });
});

router.get("/student/:studentId", async (req, res, next) => {
  const student = await User.findById(req.params.studentId);
  res.render("students/details", { student });
});

router.get(
  "/student/:studentId/edit",
  [isLoggedIn, checkRole(["PM"])],
  async (req, res, next) => {
    const student = await User.findById(req.params.studentId);
    res.render("students/update-form", { student });
  }
);

router.post(
  "/student/:studentId/edit",
  [isLoggedIn, checkRole(["PM"])],
  async (req, res, next) => {
    const student = await User.findByIdAndUpdate(
      req.params.studentId,
      req.body
    );
    res.redirect("/students");
  }
);

router.post(
  "/student/:studentId/delete",
  isLoggedIn,
  async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/students");
  }
);

// Logout
router.post("/cerrar-sesion", (req, res, next) => {
  req.session.destroy(() => res.redirect("/iniciar-sesion"));
});

module.exports = router;
