const router = require("express").Router();

const { isLoggedIn, checkRole } = require("./../middlewares/route-guard");

const User = require("../models/User.model");

//list of tas

router.get("/tas", isLoggedIn, (req, res, next) => {
    User.find({ role: "TA" })
        .then((teacherAsistant) => {
            res.render("TAs/TAs-list", { teacherAsistant });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
