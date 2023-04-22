const router = require("express").Router();
const User = require("../models/User.model");

const {isLoggedIn , isLoggedOut, checkRole} = require("../middlewares/route-guard")
router.get("/", isLoggedIn, async (req, res, next) => {
    try {
      const students = await User.find();
      res.render("students", { students });
    } catch (error) {
      res.render("error", { error });
    }
  });
  
  router.get("/:id", isLoggedIn, async (req, res, next) => {
    try {
      const student = await User.findById(req.params.id);
      res.render("user-profile", { student, canDelete:req.session.currentUser && ["PM"].includes(req.session.currentUser.role),
       canEdit:req.session.currentUser && ["PM"].includes(req.session.currentUser.role) });
    } catch (error) {
      res.render("error", { error });
    }
  });
router.get("/:id/delete", checkRole("PM"), async(req,res,next)=>{
    try{
       await User.findByIdAndRemove(req.params.id)
       res.redirect("/")
    }catch (error) {
        res.render("error", {error} )
    }
})
router.get("/:id/edit", checkRole("PM"), async(req,res,next)=>{
    try{ 
         const student = await User.findById(req.params.id)
        res.render("student-edit" , {student})
        
    }
    catch(error){ res.render("error", {error})}
})

router.post("/:id/edit", checkRole("PM"), async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/")
    }
    catch(error){ res.render("error", {error})}
}
)
  module.exports = router