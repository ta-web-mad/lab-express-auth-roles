const router = require("express").Router();
const express = require("express");
const User = require("../models/User.model");
const { isLoggedIn } = require('../middlewares/route-guard')

router.get("/", async (req, res, next) => {
  const students = await User.find();
  res.render("students/students", { students });
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
    const { id } = req.params;
    const profile = await User.findById(id);
    res.render("students/profile", { profile })
})


module.exports = router;
