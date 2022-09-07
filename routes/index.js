
const isLogedin = require('../middleware/is_logedin.middleware');

module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);


  const stud = require('./stud.routes');
  app.use('/students', isLogedin, stud);
}
