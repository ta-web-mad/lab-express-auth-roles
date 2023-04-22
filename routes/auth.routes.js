const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const {
  isLoggedIn,
  isLoggedOut,
  checkRole,
} = require("../middleware/route-guard");

// Signup
router.get("/registro", (req, res, next) => res.render("auth/signup"));
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
        res.redirect("/");
      }
    })
    .catch((error) => next(error));
});

router.get("/students", isLoggedIn, async (req, res, next) => {
  const students = await User.find();
  res.render("Users/students", { students });
});
router.get("/students/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const student = await User.findById(id);
  res.render("Users/student-detail", {
    student,
    canEdit:
      req.session.currentUser && ["PM"].includes(req.session.currentUser.role),
    canDelete:
      req.session.currentUser && ["PM"].includes(req.session.currentUser.role),
  });
});

router.get(
  "/students/:id/edit",
  [isLoggedIn, checkRole("PM")],
  async (req, res, next) => {
    const { id } = req.params;
    const student = await User.findById(id);
    res.render("Users/update-form", { student });
  }
);

router.post(
  "/students/:id/edit",
  [isLoggedIn, checkRole("PM")],
  async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    res.redirect("/students");
  }
);

router.post(
  "/students/:id/delete",
  [isLoggedIn, checkRole("PM")],
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
