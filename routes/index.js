const { use } = require("./user.routes")

module.exports = app => {

  const indexRouter = require("./index.routes")
  app.use("/", indexRouter)

  const authRouter = require("./auth.routes")
  app.use("/", authRouter)

  const userRouter = require('./user.routes')
  app.use('/students', userRouter)
}
