const { rolesChecker } = require("../utils/roles-checker");
const router = require("express").Router()

router.get("/", (req, res, next) => {

  const roles = rolesChecker(req.session.currentUser)

  res.render("index", { roles })
})

module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Students routes
  const studentRouter = require("./students.routes");
  app.use("/", studentRouter);

  //Admin routes
  const pmRouter = require("./pm.routes");
  app.use("/", pmRouter);

}


