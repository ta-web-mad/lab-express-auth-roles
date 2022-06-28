module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 


  const privateRouter = require("./private.routes");
  app.use("/", privateRouter); 


  const coursesRouter = require("./courses.routes")
  app.use("/", coursesRouter)
}
