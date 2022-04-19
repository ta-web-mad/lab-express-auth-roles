module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  // User routes
  const privateRouter = require("./private-zone.routes");
  app.use("/", privateRouter); 

  
}

