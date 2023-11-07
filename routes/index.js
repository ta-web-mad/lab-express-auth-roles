module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes")
  app.use("/", indexRouter)

  // Auth routes
  const authRouter = require("./auth.routes")
  app.use("/", authRouter)

  //User Routes
  const userRouter = require("./user.routes")
  app.use("/students", userRouter)


  //Courses Routes
  const courseRouter = require("./courses.routes")
  app.use("/cursos", courseRouter)
}
