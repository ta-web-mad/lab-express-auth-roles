module.exports = app => {

  const fn = (req,res,next)=>{
    req.app.locals.thisuser = req.session.currentUser
    next()
  } 
  app.use('/', fn)
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  const studentRouter = require("./students.routes");
  app.use("/students", studentRouter); 
  

  const coursesRouter = require("./courses.routes");
  app.use("/courses", coursesRouter); 
}
