const router = require("express").Router()

const { isLoggedIn, checkRoles } = require('../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})











// router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
//   res.render("user/profile", { user: req.session.currentUser })
// })

// // admin route: role based access
// router.get('/admin', isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {
//   res.render('admin-panel')
// })

module.exports = router
