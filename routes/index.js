module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  //Limited routes (Student related)
  const privateAllRouter = require("./all-private-zone.routes");
  app.use("/", privateAllRouter); 


  // PM limited routes
  const privatePMRouter = require("./pm-private-zone.routes")
  app.use("/", privatePMRouter)

  // TA limited routes
  const privateTARouter = require("./ta-private-zone.routes")
  app.use("/", privateTARouter)

}
