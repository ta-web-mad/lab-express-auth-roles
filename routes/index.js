module.exports = app => {
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 
  app.use("/", require("./user.routes"))
  app.use("/", require("./admin.routes"))
  app.use("/", require("./ta.routes"))



}
