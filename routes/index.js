module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  //User routes
  const usrRouter = require("./usr.routes")
  app.use("/", usrRouter)

  //Course Routes
  const courseRouter = require("./course.routes")
  app.use("/", courseRouter)
}

