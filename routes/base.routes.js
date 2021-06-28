const router = require('express').Router()

router.get('/', (req, res) => {
  const user = req.session?.currentUser
  // res.send(user)
  res.render('index', { user })
})

module.exports = router
