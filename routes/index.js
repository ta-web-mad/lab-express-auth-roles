module.exports = (app) => {
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

  const userRoutes = require("./user.routes");
  app.use("/", userRoutes);

  const pmRoutes = require("./pm.routes");
  app.use("/", pmRoutes);
};
