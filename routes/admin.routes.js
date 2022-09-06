const router = require("express").Router()
// //const isLogged = require('../middleware/is_logged.middleware')
// const UserModel = require("../models/User.model")
const { PM } = require('../const/user.const');
const { roleValidation } = require('../middleware/roles.middleware');

router.get('/', roleValidation([PM]), (req, res, next) => {

    res.render('/index')
})

module.exports = router
