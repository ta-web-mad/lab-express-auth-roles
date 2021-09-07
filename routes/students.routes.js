const router = require("express").Router();
const User = require("../models/User.model");
const { checkId, isLoggedIn, checkRoles } = require("../middleware");


router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find()
        .select('username')
        .then(user => res.render('./students/students-list', { user, isLoggedIn: req.session.currentUser }))
        .catch(err => console.log(err))

}) 


router.get("/details/:id", isLoggedIn,  (req, res, next) => { 
   
    const{id} = req.params;  

    User
      .findById(id).
       then(user => res.render('./students/details', { user, isLogged: req.session.currentUser }))
      .catch(err => console.log(err));
})
 



router.get("/edit/:user_id", isLoggedIn, checkRoles('PM'), (req, res) => {
    const { user_id } = req.params; 
    User
       .findById(user_id)
       .then(user => res.render("./students/edit-students", user))
       .catch(err => console.log(err))
})


router.post('/edit/:id',  isLoggedIn ,checkRoles("PM"),  (req, res) => {
    const { id } = req.params;
    const { username, role} = req.body;


     User
         .findByIdAndUpdate(id, { username, role })
         .then(user => res.redirect(`/students/details/${id}`))
         .catch(err => console.log(err));
})




module.exports = router; 
