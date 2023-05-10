module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

    // Students routes
  const studentRoutes = require("./student.routes");
  app.use("/", studentRoutes); 

      // PM routes
  const pmRoutes = require("./pm.routes");
  app.use("/", pmRoutes); 

       // TA routes
  const taRoutes = require("./ta.routes");
  app.use("/", taRoutes); 
}




