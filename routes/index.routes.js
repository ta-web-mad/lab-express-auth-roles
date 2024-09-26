const express = require('express');
const router = require("express").Router()

const { isLoggedIn } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { user: req.session.currentUser })
})

module.exports = router
