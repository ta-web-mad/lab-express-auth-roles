module.exports = app => {
  
  // Base routes
  // Auth routes
  const baseRouter = require("./base.routes");
  app.use("/", baseRouter);
  
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  const studentsRouter = require("./students.routes");
  app.use("/students", studentsRouter);
}

