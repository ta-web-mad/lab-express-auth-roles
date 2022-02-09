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

router.get("/students/profile/:id/edit", userLogged, privilegeCheck("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render("students/students-edit", student))
        .catch(err => console.log(err))

})


router.post("/students/profile/:id/edit", userLogged, privilegeCheck("PM"), (req, res, next) => {

    const { id } = req.params
    const { email, userPwd1, userPwd2, username, profileImg, description } = req.body

    let newUserPwd = undefined

    //gestion de errores al editar
    if (email.length === 0 || username.length === 0 || userPwd1.length === 0 || userPwd2.length === 0 || description.length === 0) {
        User
            .findById(id)
            .then(student => {

                student.errorMessage = "Por favor, complete todos los campos"
                res.render("students/students-edit", student)

            })



    }

    //he dejado la imagen opcional para probar si funcionaba el default del modelo

    //he comentado esto ya que si no las contraseñas son muy largas. pero funciona

    // else if (!hasNumber(userPwd1) || userPwd1.length < 8) {

    //     User
    //         .findById(id)
    //         .then(student => {

    //             student.errorMessage = "La contraseña debe ser almenos 8 caracteres y contener un número"
    //             res.render("students/students-edit", student)

    //         })

    // }


    else if (userPwd1 !== userPwd2) {
        User
            .findById(id)
            .then(student => {

                student.errorMessage = "Las contraseñas no coinciden"
                res.render("students/students-edit", student)

            })
    }
    //actualizacion de contraseña
    else {
        bcryptjs
            .genSalt(saltRounds)
            .then(salt => bcryptjs.hash(userPwd1, salt))
            .then(hashedPassword => {
                newUserPwd = hashedPassword
            })


        User
            .findByIdAndUpdate(id, { username, email, password: newUserPwd, profileImg, description })
            .then(student => {
                student.isOwner = true
                res.render("students/students-profile", student)
            })
            .catch(err => console.log(err)
            )
    }


})


//delete

router.post("/courses/:id/delete", userLogged, privilegeCheck("TA"), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)

        .then(() => res.render("index", { errorMessage: 'curso eliminado' }))
        .catch(err => console.log(err))

})

//borrar

module.exports = router