const router = require("express").Router();
const bcrypt = require("bcrypt");

const { userLogged, userNotLogged } = require('./../middleware');

const User = require('./../models/user.model');

/* GET home page */
router.get("/", userLogged, (req, res, next) => {
    
    const { currentUser } = req.session;

    console.log(req.session);

    res.render("index", currentUser);
});

/* LOGIN ROUTES */
router.get('/login', userNotLogged, (req, res, next) => {
    res.render('login');
});

router.post('/login', (req, res, next) => {

    const { username, password } = req.body;

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('login', { errorMsg: 'User not found' });
                return;
            }

            if (!bcrypt.compareSync(password, user.password)) {
                res.render('login', { errorMsg: 'Wrong password' });
                return;
            }

            req.session.currentUser = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));
})

/* SIGN UP ROUTES */
router.get('/signup', userNotLogged, (req, res, next) => {
    res.render('signup');
});

router.post('/signup', (req, res, next) => {

    const { username, password } = req.body;

    User
        .findOne({ username })
        .then(user => {

            if(user || !username) {
                res.render('signup', { errorMsg: 'No valid username' });
                return;
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.error(err))
        })
        .catch(err => console.error(err));
    
});

/* LOG OUT ROUTES */
router.get('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})

module.exports = router;