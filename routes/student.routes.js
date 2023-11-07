const router = require("express").Router()


const { checkRole } = require("../middleware/route-guard")
const { isLogged } = require("../middleware/route-guard")
const { checkOwner } = require("../middleware/route-guard")


const User = require('./../models/User.model')

router.get("/", (req, res) => {


    User
        .find()
        .then(all => res.render('student/list-all',
            {
                all: all,
                isPM: req.session.currentUser.role === "PM"
            }))
        .catch(err => console.log("ERROR:", err))
})

router.get('/:id', isLogged, (req, res) => {
    const { id } = req.params
    const user = req.session.currentUser._id
    //console.log(id, user)

    User
        .findById(id)
        .then(usr => res.render('student/profile-page', { usr: usr, isOwner: id == user }))
        .catch(err => console.log("ERROR: ", err))
})


router.get('/:id/editar', isLogged, checkOwner, (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then(student => res.render('student/edit-profile', student))
        .catch(err => console.log("ERROR: ", err))
})

router.post('/:id/editar', isLogged, checkOwner, (req, res) => {
    const { username, email, profileImg, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect(`/student/${id}`))
        .catch(err => console.log("ERROR: ", err))
})


router.post('/:id/eliminar', isLogged, checkRole("PM"), (req, res) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/student'))
        .catch(err => console.log("ERROR: ", err))

})


//ROLES
router.post('/:id/role', isLogged, checkRole("PM"), (req, res) => {
    const { id } = req.params
    const { role } = req.body
    console.log("ESTOY EN ROOOOLE", role)
    User
        .findByIdAndUpdate(id, { role })
        .then(() => res.redirect('/student'))
        .catch(err => console.log("ERROR", err))
})




module.exports = router
