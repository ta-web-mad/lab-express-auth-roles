module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const studentRoute = require('./student.routes.js');
  app.use('/', studentRoute);

  const pmRoute = require('./pm.routes.js');
  app.use('/', pmRoute)

  const taRoute = require('./tA.routes.js');
  app.use('/', taRoute)
}
