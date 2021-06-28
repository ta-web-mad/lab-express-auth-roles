const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require('./../models/user.model');

const { userLogged, accessRoles } = require('./../middleware');

router.get("/", userLogged, (req, res, next) => {
    const isPM = req.session.currentUser.role === 'PM';

    User
        .find()
        .then(users => res.render('students/students', { users, isPM }))
        .catch(err => console.error(err));    
});

router.get("/:id", userLogged, (req, res, next) => {
    const isPM = req.session.currentUser.role === 'PM';
    const isSelf = req.session.currentUser._id === req.params.id;
    
    User
        .findById(req.params.id)
        .then(user => res.render('students/student-details', { user, isPM, isSelf }))
        .catch(err => console.error(err));    
});

router.get('/:id/edit', userLogged, accessRoles('PM'), (req, res, next) => {
    User
        .findById(req.params.id)
        .then(user => res.render('students/student-edit', user))
        .catch(err => console.error(err));
});

router.post('/:id/edit', userLogged, accessRoles('PM'), (req, res, next) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect('/students/' + req.params.id))
        .catch(err => console.error(err));
});

router.post('/:id/delete', userLogged, accessRoles('PM'), (req, res, next) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/students'))
        .catch(err => console.error(err));
});

router.post('/:id/role-update', userLogged, accessRoles('PM'), (req, res, next) => {
    User
        .findByIdAndUpdate(req.params.id, req.query)
        .then(() => res.redirect('/students/' + req.params.id))
        .catch(err => console.error(err));
});

router.get('/:id/edit-profile', userLogged, (req, res, next) => {

    const isSelf = req.session.currentUser._id === req.params.id;

    if(!isSelf) {
        res.redirect('/students/'+req.params.id);
        return;
    } else {
        User
            .findById(req.params.id)
            .then(user => res.render('students/edit-profile', {user}))
            .catch(err => console.error(err));
    }
});

router.post('/:id/edit-profile', userLogged, (req, res, next) => {

    const { username, currentPassword, newPassword } = req.body;

    User
        .findOne({ username })
        .then(user => {
            if(user && user._id != req.params.id || !username) {                
                User
                    .findById(req.params.id)
                    .then(prevUser => res.render('students/edit-profile', { user: prevUser, errorMsg: 'No valid username' }))
                    .catch(err => console.error(err));
                return;
            }

            User
                .findById(req.params.id)
                .then(user => {
                    const bcryptSalt = 10;
                    const salt = bcrypt.genSaltSync(bcryptSalt);
                    const hashPass = bcrypt.hashSync(newPassword, salt);

                    if(!bcrypt.compareSync(currentPassword, user.password)) {
                        res.render('students/edit-profile', { user, errorMsg: 'Wrong password' });
                        return;
                    } 

                    User
                        .findByIdAndUpdate(req.params.id, { username, password: hashPass })
                        .then((res.redirect('/students/'+req.params.id)))
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
            
        })
        .catch(err => console.error(err));
});

module.exports = router;