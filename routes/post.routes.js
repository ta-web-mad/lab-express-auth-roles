const router = require('express').Router();
const { PM } = require('../const/user.const');
const User = require("../models/User.model")
const { roleValidation } = require('../middleware/roles.middleware');

router.get('/', roleValidation([PM]), (req, res, next) => {
    res.render('post/index');
})

module.exports = router


