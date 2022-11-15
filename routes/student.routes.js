const router = require("express").Router();
const User = require("./../models/User.model");

// Middleware import
const { isLoggedIn, checkRoles } = require("../middleware/route-guard");

// Student directory

router.get("/", isLoggedIn, (req, res) => {
	User.find({ role: "STUDENT" })
		.select({ username: 1, profileImg: 1, _id: 1 })
		.then((student) => {
			res.render("student/list", { student });
		})
		.catch((err) => console.log(err));
});

// Student details
router.get("/details/:student_id", isLoggedIn, (req, res) => {
	const { student_id } = req.params;

	User.findById(student_id)
		.then((student) => {
			res.render("student/details", {
				student,
				isPM: req.session.currentUser.role === "PM",
				isTheStudent: req.session.currentUser._id === student_id,
			});
		})
		.catch((err) => console.log(err));
});

// Edit Student
router.get("/details/:student_id/edit", isLoggedIn, (req, res) => {
	const { student_id } = req.params;

	User.findById(student_id)
		.then((student) => res.render("student/edit", student))
		.catch((err) => console.log(err));
});

router.post("/details/:student_id/edit", isLoggedIn, (req, res) => {
	const { username, email, profileImg, description } = req.body;
	const { student_id } = req.params;

	User.findByIdAndUpdate(student_id, { username, email, profileImg, description })
		.then(() => {
			res.redirect("/students");
		})
		.catch((err) => console.log(err));
});

// Delete student
router.post("/:student_id/delete", isLoggedIn, (req, res) => {
	const { student_id } = req.params;

	User.findByIdAndDelete(student_id)
		.then(() => res.redirect("/students"))
		.catch((err) => console.log(err));
});

// Make student TA
router.post("/:student_id/promote-to-ta", isLoggedIn, (req, res) => {
	const { student_id } = req.params;

	User.findByIdAndUpdate(student_id, { role: "TA" })
		.then(() => res.redirect(`/students/details/${student_id}`))
		.catch((err) => console.log(err));
});

// Make student DEV
router.post("/:student_id/promote-to-dev", isLoggedIn, (req, res) => {
	const { student_id } = req.params;

	User.findByIdAndUpdate(student_id, { role: "DEV" })
		.then(() => res.redirect(`/students/details/${student_id}`))
		.catch((err) => console.log(err));
});

module.exports = router;
