const router = require("express").Router()
const { findById } = require("../models/User.model")
const Users = require("../models/User.model")

const { isLoggedIn } = require("../middlewares/route-guard")

router.get("/", isLoggedIn, async (req, res, next) => {

    try {
        const students = await Users.find()
        res.render("students", { students })
    }
    catch (error) { next(error) }

})
router.get("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        res.render("userDetails", { user })
    }
    catch (error) { next(error) }
})

module.exports = router
