module.exports = app => {

  
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 

  const studenRoutes = require("./students.routes");
  app.use("/", studenRoutes);


}
