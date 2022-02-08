const router = require("express").Router();
const { isLoggedIn, checkRole } = require("../middleware/routeguard");
const { isPM, isStudent, isTA, isDEV } = require("../utils/utils");

router.get("/", (req, res, next) => {
  res.render("index");
});

// router.get("/privada1", isLoggedIn, (req, res, next) => {
//   res.render("private-view", { user: req.session.currentUser });
// });

// router.get("/pm", isLoggedIn, checkRole("PM"), (req, res, next) => {
//   res.render("pm", { user: req.session.currentUser });
// });

// // router.get("/privada3", isLoggedIn, checkRole("ADMIN", "EDITOR"),
// //   (req, res, next) => {
// //     res.render("private-view", { user: req.session.currentUser });
// //   }
// // );

router.get("/conditional-render", isLoggedIn, (req, res, next) => {
  res.render("role-rendered", {
    user: req.session.currentUser,
    isPM: isPM(req.session.currentUser),
    isStudent: isStudent(req.session.currentUser),
    isTA: isTA(req.session.currentUser),
    isDEV: isDEV(req.session.currentUser),
  });
});

module.exports = router;
