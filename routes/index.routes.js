const { logueado } = require("../middleware/route-ward")
const { userIsTA } = require("../utils")

const router = require("express").Router()

router.get("/", logueado, (req, res, next) => {
  

  const isTA = userIsTA(req.session.currentUser)
  
  console.log(isTA)
  res.render("index", {isTA})
})

module.exports = router
