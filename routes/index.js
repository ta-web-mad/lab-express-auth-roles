module.exports = (app) => {
  // Base URLS
  app.use("/", require("./base.routes.js"))
  app.use("/login", require("./auth.routes.js"))
  app.use("/my-platform", require("./employee.routes.js"))
  app.use("/my-platform", require("./platform.routes.js"))
  app.use("/my-platform", require("./boss.routes.js"))
}
