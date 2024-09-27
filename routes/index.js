module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

  const studentsRouter = require("./students.routes");
  app.use("/", studentsRouter);
}

const app = require("../app");
