const router = require("express").Router();

/* GET home page */
router.get("/my-profile", (req, res) => {
  res.render("user/user-profile");
});

module.exports = router;