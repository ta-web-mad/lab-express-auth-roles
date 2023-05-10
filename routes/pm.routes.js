const router = require("express").Router()
const User = require("../models/User.model")
const { checkRoles } = require("../middlewares/route.guard")



router.post("/student/:id_student/delete", checkRoles("PM") ,(req, res) => {
     const { id_student } = req.params

  User
    .findByIdAndDelete(id_student)
    .then(() => res.redirect("/students"))
    .catch(err => console.log(err))
})

router.post("/student/:id_student/dev" ,checkRoles("PM"),(req, res) => {
      const { id_student } = req.params

  User
    .findByIdAndUpdate(id_student, { role: "DEV" })
    .then(() => res.redirect(`/student/${id_student}`))
    .catch(err => console.log(err))

})

router.post("/student/:id_student/ta",checkRoles("PM"),(req, res) => {
      const { id_student } = req.params

  User
    .findByIdAndUpdate(id_student, { role: "TA" })
    .then(() => res.redirect(`/student/${id_student}`))
    .catch(err => console.log(err))


})




module.exports = router
