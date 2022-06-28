module.exports = app => {
  
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);
  
  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter); 

// students routes
const studentRouter = require("./student.routes");
app.use("/", studentRouter); 

// admin routes
const adminRouter = require("./admin.routes");
app.use("/", adminRouter); 
}