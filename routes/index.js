module.exports = (app) => {
    // Base routes
    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    // Auth routes
    const authRouter = require("./auth.routes");
    app.use("/", authRouter);

    //students routes

    app.use("/", require("./students.routes"));

    //TAs routes
    app.use("/", require("./TAs.routes"));


    module.exports = app;
};
