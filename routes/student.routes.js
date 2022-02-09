const router = require("express").Router()

const User = require("../models/User.model")
const { userLogged, privilegeCheck } = require("../middleware/route-guard")

const { isPM, isTA, isDEV, isOwner, hasNumber } = require("../utils/index")

const bcryptjs = require('bcryptjs')
const { findById } = require("../models/User.model")
const saltRounds = 10


//all

router.get("/students", (req, res, next) => {

    User
        .find()
        .then(users => res.render("students/students-list", { users }))
        .catch(err => console.log(err))
})


//profile

router.get("/students/profile/:id", userLogged, (req, res, next) => {

    const { id } = req.params


    User
        .findById(id)
        .then(student => {
            student.isOwner = isOwner(req.session.currentUser._id, id)
            student.isPM = isPM(req.session.currentUser)
            student.isTA = isTA(req.session.currentUser)
            student.isDEV = isDEV(req.session.currentUser)

            res.render("students/students-profile", student)
        })
        .catch(err => console.log(err))





})


//edit

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

router.post("/students/profile/:id/delete", userLogged, privilegeCheck("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.render("index", { errorMessage: 'Perfil eliminado' }))
        .catch(err => console.log(err))

})

//upgrade
router.post("/students/profile/:id/toTA", userLogged, privilegeCheck("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "TA" }, { new: true })
        .then(student => {

            student.errorMessage = "Usuario modificado"
            student.isPM = true
            res.render("students/students-profile", student)
        })
        .catch(err => console.log(err))

})
router.post("/students/profile/:id/toDEV", userLogged, privilegeCheck("PM"), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: "DEV" }, { new: true })
        .then(student => {

            student.errorMessage = "Usuario modificado"
            student.isPM = true
            res.render("students/students-profile", student)
        })
        .catch(err => console.log(err))

})



//router.exports


module.exports = router
