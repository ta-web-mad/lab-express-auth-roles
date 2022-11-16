const router = require("express").Router();
const { STUDENT, PM, TA, DEV } = require("../const/user.const");
const rolesValidation = require("../middleware/roles.middleware");
const UserModel = require('../models/User.model');

router.get("/students", rolesValidation([STUDENT, PM]), (req, res, next) => {
    UserModel
        .find({ role: { $in: [STUDENT, TA, DEV] } })
        .then((students) => {
            res.render("student/list", { students });
        })
        .catch(next);
});

router.get("/student/edit-profile", rolesValidation([STUDENT, PM]), (req, res, next) => {
    const userProfileId = req.session.currentUser._id;

    UserModel
        .findById(userProfileId)
        .then((student) => {
            res.render('student/edit', { student });
        })
        .catch(next);
});

router.get("/student/:id", rolesValidation([STUDENT, PM]), (req, res, next) => {
    const { id } = req.params;

    UserModel
        .findById(id)
        .then((student) => {
            res.render("student/detail", student);
        })
        .catch(next);
});

router.get("/student/:id/delete", rolesValidation([PM]), (req, res, next) => {
    const { id } = req.params;

    UserModel
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/students");
        })
        .catch(next);
});

router.get("/student/:id/edit", rolesValidation([PM]), (req, res, next) => {
    const { id } = req.params;
    const rolesArray = [STUDENT, DEV, TA];
    UserModel
        .findById(id)
        .then((student) => {
            rolesArray.map((role, i, roles) => { if (role === student.role) { roles.splice(i, 1) } })
            res.render('student/edit', { student, rolesArray });
        })
        .catch(next);
});

router.post("/student/:id/edit", rolesValidation([STUDENT, PM]), (req, res, next) => {
    const { id } = req.params;
    const { username, email, profileImg, description, role } = req.body;

    UserModel
        .findByIdAndUpdate(id, { username, email, profileImg, description, role }, { new: true })
        .then(() => {
            res.redirect('/students/');
        })
        .catch(next);
});

module.exports = router