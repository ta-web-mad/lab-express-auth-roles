const router = require("express").Router()
const Course = require("../models/Course.model")
const User = require("../models/User.model")
const { checkRoles, isLoggedIn } = require("../middleware/index")
const { isTA } = require("../utils/index")

router.get('/course/create', isLoggedIn, checkRoles('TA'), (req, res) => {
	User.find({ role: "TA" })
	.then(tas => {
		res.render("courses/create-course", { tas })
	})
})

router.post('/course/create', isLoggedIn, checkRoles('TA'), (req, res) => {
	User.find({ role: "TA" })
		.then(tas => {
			res.render("courses/create-course", { tas })
		})
})

module.exports = router