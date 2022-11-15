const router = require("express").Router();

// Middleware import
// const { isLoggedIn, checkRoles } = require("../middleware/route-guard");

// Index
router.get("/", (req, res, next) => {
	res.render("index");
});

module.exports = router;
