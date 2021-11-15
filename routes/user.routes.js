const router = require("express").Router();
 const { isLoggedIn/* , checkRoles */ } = require("../middlewares")
const User = require("../models/User.model");
const { isPM } = require("../utils");




/* GET home page */
router.get("/", (req, res, next) => {

    User.find()
        .then(allusers => res.render("users/user-list", { allusers, isPM:isPM(req.session.currentUser) }))
        .catch(err => console.log(err))

});

router.get("/profile-page/:id", isLoggedIn, (req, res, next) => {
  
    User.findById(req.params.id)
        .then(User => res.render("users/profile-page", req.session.currentUser))
        .catch(err => console.log(err))


});

router.get("/:id/editar", isLoggedIn, (req, res, next) => {

    User.findById(req.params.id)
        .then(user => res.render("users/user-edit", user))
        .catch(err => console.log(err))


});

router.post("/editar/:id", isLoggedIn, (req, res) => {
    const { id } = req.params
    const { username, name, password, profileImg,  } = req.body

    Book.findByIdAndUpdate(id, { username, name, password, profileImg, }, { new: true })
        .then(book => res.redirect(`/libros/detalles/${book._id}`))
        .catch(err => console.log(err))
})



module.exports = router