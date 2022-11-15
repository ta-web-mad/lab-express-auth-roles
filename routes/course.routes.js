const router = require("express").Router();
const User = require("./../models/User.model");
const Course = require("./../models/Course.model");

// Middleware import
const { isLoggedIn, checkRoles } = require("../middleware/route-guard");

// Course list
router.get("/", isLoggedIn, checkRoles("DEV"), (req, res) => {
	Course.find()
		.select({ title: 1, description: 1, leadTeacher: 1, endDate: 1, startDate: 1 })
		.populate("leadTeacher")
		.then((courses) => {
			res.render("courses/list", { courses });
		})
		.catch((err) => {
			console.log("Error encontrando los cursos");
			console.log(err);
		});
});

// Create course
router.get("/create-course", isLoggedIn, checkRoles("DEV"), async (req, res) => {
	try {
		// Sorry no lo supe sacar de otra forma ;(
		const students = await User.find({ role: "STUDENT" }).select({ username: 1 });
		const devs = await User.find({ role: "DEV" }).select({ username: 1 });
		const tas = await User.find({ role: "TA" }).select({ username: 1 });
		res.render("courses/create", { students, devs, tas });
	} catch (err) {
		console.log(err);
	}

	/* let students;
	let devs;
	let tas;

	User.find({ role: "STUDENT" })
		.select({ username: 1 })
		.then((student) => {
			students = student;
		});
	User.find({ role: "DEV" })
		.select({ username: 1 })
		.then((dev) => {
			dev = devs;
		});
	User.find({ role: "TA" })
		.select({ username: 1 })
		.then((ta) => {
			ta = tas;
		});
	res.render("courses/create", { students, devs, tas }); */
});

router.post("/create-course", (req, res) => {
	const { title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students } = req.body;

	Course.create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, statusCreate, students })
		.populate("leadTeacher")
		.then(() => {
			res.redirect("/courses");
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
