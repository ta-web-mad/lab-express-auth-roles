const router = require('express').Router()
const User = require('../models/User.model')

router.get('/', (req, res, next) => {
	const userRoles = {
		isTA: req.session.currentUser?.role === 'TA',
	}

	res.render('index', userRoles)
})

module.exports = router
