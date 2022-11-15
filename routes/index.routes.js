const router = require("express").Router()
const { isLoggedIn } = require('../middleware/route-guard')
router.get("/", (req, res, next) => {
  res.render("index")
})


//crear el perfil 
router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
  res.render("students/profile", { user: req.session.currentUser })
})




module.exports = router
