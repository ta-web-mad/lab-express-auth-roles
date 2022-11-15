const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {
    res.render("index")
})

module.exports = router