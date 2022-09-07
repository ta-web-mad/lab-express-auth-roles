const router = require("express").Router()
const UserModel = require("../models/User.model");
const { STUDENT, PM } = require("../const/user.const")
const roleValidation = require("../middleware/roles.middleware");

router.get("/", (req, res) => {
    //roleValidation([STUDENT, PM])

    UserModel.find()
        .then((users) => {
            let isPM
            if (req.session.currentUser.role === PM) {
                isPM = true
                console.log(isPM)
                res.render("students/students", { users, isPM });
            } else {
                res.render("students/students", { users });
            }
        })
        .catch((err) => console.log(err));
})

router.get("/:id", (req, res) => {
    console.log(req.params.id);
    UserModel.findById(req.params.id)
        .then((ide) => {
            console.log(ide);
            res.render("students/profile", ide)
        })
        .catch((err) => console.log(err))

})

// router.get("/students/delete", (req, res) => {


// })

router.post("/students/delete", (req, res, next) => {

    console.log(req.body.idStud);
    UserModel.findByIdAndDelete(req.body.idStud)
        .then((deleteStu) => {
            res.redirect("/students")

        })
        .catch((err) => next(err));
})

module.exports = router;