const router = require("express").Router();

const { isLoggedIn, checkRole } = require("./../middlewares/route-guard");

const User = require("../models/User.model");

//students list

router.get("/students", isLoggedIn, (req, res, next) => {
    User.find({ role: "STUDENT" })
        .then((students) => {
            res.render("students/students-list", { students });
        })
        .catch((err) => {
            console.log(err);
        });
});

//student profile

router.get("/students/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    const isPM = req.session.currentUser.role === "PM";
    const isSameId = req.session.currentUser._id === id;

    User.findById(id)
        .then((student) => {
            res.render("students/student-details", {
                student,
                isPM,
                isSameId,
            });
        })

        .catch((err) => {
            console.log(err);
        });
});

//ELIMINAR

router.post("/students/:id/delete", checkRole("PM"), (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/students");
        })
        .catch((err) => console.log(err));
});

//EDITAR

router.get("/students/:id/edit", checkRole("PM"), (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((student) => {
            console.log(student);
            res.render("students/student-update", student);
        })
        .catch((err) => console.log(err));
});

router.post("/students/:id/edit", checkRole("PM"), (req, res, next) => {
    const { email, password, username, profileImg, description } = req.body;
    const { id } = req.params;

    User.findByIdAndUpdate(id, {
        username,
        email,
        password,
        profileImg,
        description,
    })
        .then(() => {
            res.redirect("/students");
        })
        .catch((err) => console.log(err));
});

// role update

router.post("/students/:id/edit-role", checkRole("PM"), (req, res, next) => {
    const { role } = req.body;
    const { id } = req.params;

    User.findByIdAndUpdate(id, { role })
        .then(() => {
            res.redirect("/students");
        })
        .catch((err) => console.log(err));
});

module.exports = router;
