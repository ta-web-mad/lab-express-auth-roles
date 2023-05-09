const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares/route.guard")
const User = require("./../models/User.model")

router.post("/:id/eliminar", isLoggedIn, checkRoles("PM"), (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(res.redirect("/students"))
        .catch(err => console.log("el erro es ======> ", err))
})

router.get("/:id/editar", isLoggedIn, checkRoles("PM"), (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render("pm/pm-edit", user))
        .catch(err => console.log("ERROR =====> ", err))
})

router.post("/:id/editar", isLoggedIn, checkRoles("PM"), (req, res, next) => {
    const { id } = req.params
    const { username, email, profileImage, description, userRoles } = req.body
    User
        .findByIdAndUpdate(id, { username, email, profileImage, description, userRoles })
        .then(() => res.redirect("/students"))
        .catch(err => console.log("ERROR =====> ", err))
})
module.exports = router