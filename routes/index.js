module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  //Private routes
  const privateRouter = require("./private.routes");
  app.use("/", privateRouter);
}
