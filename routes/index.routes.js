const router = require("express").Router()
const Estudiantes = require('./../models/User.model')

router.get("/", (req, res, next) => {
  res.render("index")
})

module.exports = router
