const router = require("express").Router();
const app = require('../app')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')



/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});






module.exports= router