const router = require("express").Router();
const { isLoggedIn, checkRoles } = require("../middlewares")
const User = require("../models/User.model")
const { checkMongoID, isPM, isSelf } = require("../utils");

/* GET home page */

// router.get("/profile/:id", (req, res, next) => {
//   res.render("profile")
// });

router.get("/profile/:id", (req, res) => {
  const { id } = req.params
  const isOwn = req.session.currentUser._id === id

  if (!checkMongoID(id)) {
    res.render("user-list", { errorMessage: "Este usuario no existe" })
  }

  User.findById(id)
    .then(user => {

      res.render("profile", { user,
        loggedUser: req.session.currentUser,
        isPM: isPM(req.session.currentUser),
        isOwn
        })
    })
    .catch(err => console.log(err))

})

router.get("/user/delete/:id", checkRoles("PM"), (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))

})

router.post("/user/edit/:id", isLoggedIn, (req, res) => {
  const { id } = req.params
  const { name, profileImg, description, role } = req.body
  
  const query = {
    name,
    profileImg,
    description,
  }

  //guillehack
  role ? query.role = role : null;

  User.findByIdAndUpdate(id, query, { new: true })
    .then(book => res.redirect("../../user-list"))
    .catch(err => console.log(err))
})




module.exports = router;