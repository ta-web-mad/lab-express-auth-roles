const router = require("express").Router();
const { isLoggedIn, checkRole } = require("../middleware/routeguard");
const { isPM, isStudent, isTA, isDEV } = require("../utils/utils");

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
