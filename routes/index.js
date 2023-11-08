module.exports = app => {

  const indexRouter = require("./index.routes")
  app.use("/", indexRouter)

  const authRouter = require("./auth.routes")
  app.use("/", authRouter)


  const student = require("./students.routes")
  app.use("/estudiantes", student)

  // const cursRouter = require("./curs.routes")
  // app.use("/cursos", cursRouter)
}
