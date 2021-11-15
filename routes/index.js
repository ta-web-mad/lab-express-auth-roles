module.exports = app => {

	// Base routes
	const baseRoutes = require("./base.routes");
	app.use("/", baseRoutes);

	// Auth routes
	const authRoutes = require("./auth.routes");
	app.use("/", authRoutes);

	// User routes
	const userRoutes = require("./user.routes");
	app.use("/", userRoutes);

	//PM routes
	const pmRoutes = require("./pm.routes");
	app.use("/", pmRoutes);

	//TA routes
	const taRoutes = require("./ta.routes");
	app.use("/", taRoutes);

}
