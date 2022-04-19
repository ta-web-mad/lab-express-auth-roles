const router = require("express").Router()
const { isLoggedIn, checkRole } = require("./../middleware/route-guard")

const currentStudent = require("./../utils/sameStudent")


const Student = require("./../models/User.model")

router.get("/", isLoggedIn, (req, res, next) => {

    Student
        .find()
        .then(students => {
            res.render("students/student-list", { students })
        })
        .catch(err => console.log(err))
})

router.get("/:id", isLoggedIn, (req, res, next) => {

    const { id } = req.params

    const isPM = req.session.currentUser.role === "PM"

    const isStudent = req.session.currentUser._id === id

    Student
        .findById(id)
        .then(detStudent => {
            res.render('students/student-details', { detStudent, isPM, isStudent })
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', isLoggedIn, (req, res) => {

    const { id } = req.params

    console.log("asdasda");

    if (req.session.currentUser._id === id || checkRole("PM")) {

        Student
            .findById(id)
            .then(editStudent => {
                res.render("students/edit-student.hbs", editStudent)
            })
            .catch(err => console.log(err))
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
})

router.post('/:id/edit', isLoggedIn, (req, res) => {
    
    const { id } = req.params
    const { email, username, profileImg, description } = req.body

    Student
        .findByIdAndUpdate(id, { email, username, profileImg, description })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))
})

router.post('/:id/delete', isLoggedIn, checkRole("PM"), (req, res) => {

    const { id } = req.params

    Student
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

router.post("/:id/updateTA", isLoggedIn, checkRole("PM"), (req, res) => {
    const { id } = req.params

    Student
        .findByIdAndUpdate(id, { role: "TA" })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))

})

router.post("/:id/updateDEV", isLoggedIn, checkRole("PM"), (req, res) => {
    const { id } = req.params

    Student
        .findByIdAndUpdate(id, { role: "DEV" })
        .then(() => res.redirect("/students"))
        .catch(err => console.log(err))

})

router.get("/:id/edit-own-profile", (req, res) => {

})

module.exports = router