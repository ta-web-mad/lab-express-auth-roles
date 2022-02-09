const router = require("express").Router()

const User = require("../models/User.model")
const Course = require("../models/Course.model")
const { userLogged, privilegeCheck } = require("../middleware/route-guard")

const { isTA, isPM, isDEV, isOwner, hasNumber, capitalize, cleanText, checkMongoID, formatDate } = require("../utils/index")

const bcryptjs = require('bcryptjs')

const saltRounds = 10

//crear

router.get("/courses/create", userLogged, privilegeCheck("TA"), (req, res, next) => {

    const profesores = {}
    User
        .find({ role: "DEV" })

        .then(devs => {
            profesores.devs = devs
            return User.find({ role: "TA" })
        })
        .then(ayudantes => {
            profesores.ayudantes = ayudantes
        })
        .then(
            () => {
                res.render("courses/courses-create", profesores)
            }
        )

})


router.post("/courses/create", (req, res, next) => {


    Course
        .create({ ...req.body })



        .then(() => res.redirect("/courses"))


})


//lista

router.get("/courses", userLogged, (req, res, next) => {




    Course
        .find()
        .then(courses => {
            courses.isTA = isTA(req.session.currentUser)
            courses.forEach(elm => {
                elm.start = formatDate(elm.startDate)
                elm.end = formatDate(elm.endDate)
                elm.isTA = isTA(req.session.currentUser)
                console.log(elm.isTA)
                elm.populate('ta')
                elm.populate('leadTeacher')


            })
            res.render("courses/courses-list", { courses })
        }
        )
        .catch(err => console.log(err))
})

//editar

router.get("/courses/:id/edit", userLogged, privilegeCheck("TA"), (req, res, next) => {

    const { id } = req.params

    Course
        .findById(id)
        .then(course => {

            course.start = formatDate(course.startDate)
            course.end = formatDate(course.endDate)

            User
                .find({ role: "DEV" })

                .then(devs => {
                    course.devs = devs
                    return User.find({ role: "TA" })
                })
                .then(ayudantes => {

                    course.ayudantes = ayudantes
                    console.log(course)
                    res.render("courses/courses-edit", course)
                })
        })
        .catch(err => console.log(err))

})


router.post("/course/:id/edit", userLogged, privilegeCheck("TA"), (req, res, next) => {

    const { id } = req.params




    //gestion de errores al editar
    if (title.length === 0 || description.length === 0 || courseImg.length === 0) {
        Course
            .findById(id)
            .then(course => {

                course.errorMessage = "Por favor, complete todos los campos"
                res.render("courses/courses-edit", course)

            })



    }




    else {
        Course
            .findByIdAndUpdate(id, { ...req.body })
            .then(() =>

                res.redirect("/courses")
            )
            .catch(err => console.log(err)
            )
    }
}
)


//delete

router.post("/courses/:id/delete", userLogged, privilegeCheck("TA"), (req, res, next) => {

    const { id } = req.params

    Course
        .findByIdAndDelete(id)

        .then(() => res.render("index", { errorMessage: 'curso eliminado' }))
        .catch(err => console.log(err))

})

//borrar

module.exports = router