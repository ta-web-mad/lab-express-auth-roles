const router = require("express").Router()
const express = require('express');

const { isLoggedIn, checkRoles, } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})


router.get("/mi-perfil", isLoggedIn, (req, res, next) => {
  res.render("user/Profile", {
    user: req.session.currentUser,
    isAdmin: req.session.currentUser.role === 'PM',
    isOwner: true,
  })
})

router.get('/admin', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
  res.render('user/PM')
})


module.exports = router
