module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  const userRouter = require("./users.routes");
  app.use("/user", userRouter); 


  const courseRouter = require("./course.routes");
  app.use("/course", courseRouter); 
}
