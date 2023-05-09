const router = require("express").Router()
const { isLoggedIn, isAuthorized, canEdit } = require("../middlewares/route-guard")
const User = require('../models/User.model')
const checkRole = require("../utils/checkRole")


router.get("/", isLoggedIn, async (req, res, next) => {
    try {
        const students = await User.find({ role: "STUDENT" })
        res.render("students/students-list", { students, role: checkRole(req.session.currentUser) })
    }
    catch (err) {
        next(err)
    }
})

router.get("/:id", isLoggedIn, async (req, res, next) => {
    const { id } = req.params
    let canEdit = false
    if (req.session.currentUser._id === id) canEdit = true
    try {
        const student = await User.findById(id)
        res.render("students/student-details", { student, role: checkRole(req.session.currentUser), canEdit }
        )
    }
    catch (err) {
        next(err)
    }
})

router.get("/:id/edit", isLoggedIn, canEdit, async (req, res, next) => {
    const { id } = req.params
    try {
        const student = await User.findById(id)
        res.render("students/student-edit", { student, role: checkRole(req.session.currentUser) }
        )
    }
    catch (err) {
        next(err)
    }

})

router.post("/:id/edit", isLoggedIn, canEdit, async (req, res, next) => {
    const { id } = req.params
    const { username, description, profileImg, email } = req.body

    const newUserInfo = {
        username, description, profileImg, email,
    }
    if (req.session.currentUser.role === "PM") newUserInfo.role = req.body.role

    try {
        await User.findByIdAndUpdate(id, newUserInfo)
        res.redirect(`/students/${id}`)
    }
    catch (err) {
        next(err)
    }
})

router.post("/:id/delete", isLoggedIn, isAuthorized("PM"), async (req, res, next) => {

    const { id } = req.params

    try {
        await User.findByIdAndDelete(id)
        res.redirect("/students")
    } catch (err) {
        next(err)
    }

})


module.exports = router
