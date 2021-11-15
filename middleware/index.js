module.exports = {
	isLoggedIn: (req, res, next) => {
		req.session.currentUser ? next() : res.render('auth/not-registered');
	},

	checkRoles: (...roles) => (req, res, next) => {
		roles.includes(req.session.currentUser.role) ? next() : res.redirect('/')
	},

	isOwnProfile: (req, res, next) => {
		console.log('primer param', req.session.currentUser._id)
		console.log('segundo param', req.session.currentUser._id)
		req.session.currentUser._id === req.params.id ? next() : res.redirect('/students')
	}
}