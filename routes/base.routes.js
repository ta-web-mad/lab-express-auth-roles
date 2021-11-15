const router = require("express").Router()
const {isPM} = require("../utils/index")

router.get("/", (req, res, next) => {

	res.render("index", { isPM: isPM(req.session.currentUser)})	
})

module.exports = router
