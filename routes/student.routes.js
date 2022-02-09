const router = require("express").Router()
const { isLoggedIn, checkRole} = require("../middleware/route-guard");
const UserModel = require("../models/User.model");
const {isPm, isTa} = require('../utils')



//Lista de estudiantes
router.get("/lista", isLoggedIn, (req, res, next) => {
  
    UserModel
        .find()
        .then(user => res.render ('student/list',{user}))
        .catch(err => console.log (err))

})
//student ID

router.get('/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    UserModel
        .findById(id)
        .then(user => res.render('student/profile', {
            user: user,
            isPm:isPm(req.session.currentUser)
        }))
        .catch(err => next(err))
})
  

// privileges to the Program Manager

//edit
 
router.get("/edit/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
      .then((student) => res.render("student/edit", student))
      .catch((err) => console.log(err));
  });
  
  router.post("/edit/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { username, email, role, profileImg, description } = req.body;
  
    User.findByIdAndUpdate(id, { username, email, role, profileImg, description  })
      .then((student) => res.redirect("/list"))
      .catch((err) => console.log(err));
  });

//delete

router.get("/delete/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
      .then((student) => res.render("student/delete", { student }))
      .catch((err) => console.log(err));
  });
  
  router.post("/delete/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
  
    User.findByIdAndDelete(id)
      .then(() => res.redirect("/student"))
      .catch((err) => console.log(err));
  });


module.exports = router
