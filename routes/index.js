module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);


  // Users routes
  // const userRouter = require("./users.routes");
  app.use("/", require("./users.routes"))  //// Esta línea quiere decir lo mismo que las dos anteriores de arriba solo que de diferente forma. Lo que dice es decirle a la aplicación que cada vez que un endpoint empiece por "/" requiera "./users.routes"

}
