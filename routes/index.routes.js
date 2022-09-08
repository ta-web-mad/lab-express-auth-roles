const router = require("express").Router() 
const User = require("./../models/User.model") 
const { isLoggedIn, checkRole, checkValue } = require("../middleware") 

router.get("/", (req, res, next) => {
  res.render("index") 
}) 

router.get("/students", isLoggedIn, (req, res) => {
  

  User.find({ role: "STUDENT" }) 
    .then((users) => {
      // console.log(users) 
      res.render("users/user-list", { users }) 
    })
    .catch((err) => console.log(err)) 
}) 

router.get("/students/:id", (req, res) => {
  const { id } = req.params 

  User.findById(id) 
    .then((user) => {
      // console.log(user) 
      res.render("users/user-details", {
        user,
        isPM: req.session.currentUser?.role === "PM",
      }) 
    })
    .catch((err) => console.log(err)) 
}) 

router.get("/students/delete/:id", (req, res) => {
  const { id } = req.params 

  User.findByIdAndDelete(id)
    .then((removedUser) => {
      res.redirect("/students") 
    })
     .catch((err) => console.log(err)) 
}) 

router.get("/students/edit/:id", (req, res) => {
  const { id } = req.params 
  User.findById(id).then((user) => {
    console.log("ESTO ES LO QUE QUEREMOS VER", user) 
    res.render("users/user-edit", user) 
  }) 
}) 

router.post("/students/edit/:id", checkRole("PM"), (req, res) => {
  const { id } = req.params 
  const { username, role } = req.body 



  User.findByIdAndUpdate(id, { username: username, role: role }, { new: true })
    .then((User) => {
      res.redirect("/students") 
    })
     .catch((err) => console.log(err)) 
}) 

router.get("/students/userEdit/:id", checkValue, (req, res) => {

  const { id } = req.params 
  User.findById(id).then((user) => {
    res.render("users/user-edit", {user, isPM: req.session.currentUser?.role === 'PM'}) 
  }) 

}) 

router.post("/students/userEdit/:id", checkValue, (req, res) => {
  const { id } = req.params 
  const { username} = req.body 

  User.findByIdAndUpdate(id, {username: username}, { new: true })
    .then((User) => {
      res.redirect("/students") 
    })
     .catch((err) => console.log(err)) 
}) 

module.exports = router 