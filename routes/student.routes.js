const router = require("express").Router();
const express = require("express");
const User = require("../models/User.model");
const {
  isLoggedIn,
  checkRole,
  profilePermise,
} = require("../middlewares/route-guard");

router.get("/", async (req, res, next) => {
  const students = await User.find();
  res.render("students/students", { students });
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const profile = await User.findById(id);
  res.render("students/profile", {
    profile,
    canEdit:
      (req.session.currentUser &&
        ["PM"].includes(req.session.currentUser.role)) ||
      req.session.currentUser._id === id,

    canDelete:
      req.session.currentUser && ["PM"].includes(req.session.currentUser.role),
  });
});

router.get(
  "/:id/edit",
  [isLoggedIn, checkRole(["PM"])],
  async (req, res, next) => {
    const { id } = req.params;
    const student = await User.findById(id);
    res.render("students/edit-form", { student });
  }
);

router.post("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, req.body);
  // res.redirect("/students/" + id);
  res.redirect(`/students/${id}`);
});

router.post(
  "/:id/delete",
  [isLoggedIn, checkRole(["PM"])],
  async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.redirect("/students");
  }
);

module.exports = router;
