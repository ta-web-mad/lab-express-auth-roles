const router = require("express").Router()

const User = require('./../models/user.model')
const Course = require('./../models/course.model')


const { checkRoles, checkLoggedUser } = require("../middleware")
// const Course = require('./../models/course.model')

router.get('/',checkLoggedUser , checkRoles('TA') , (req, res) => {
    // res.send("mosss")
    Course
    .find()
    .populate('ta')
    .then(courses => {

        if(courses.length == 0){
            res.redirect('/')
            return
        }

        // res.send(courses)

        res.render('ta/courses-list-page', {courses})
    }) 
    .catch(err => console.log(err))
    // res.render("/ta/courses-list-page")
})

router.get('/new', checkLoggedUser, checkRoles('TA') , (req, res) => {
    // res.send("KJNSLKVALKASD")
    res.render('ta/course-create')

})

router.post('/new',checkLoggedUser,checkRoles('TA') , (req, res) => {
    let id = req.session.currentUser._id
    console.log('edqffffffffff  ', id)
    const {title} = req.body

    Course
    .findOne({ title })
    .then( user => {
        if( user ){
            res.redirect('/')
            return
        }

        Course
            .create({ title, ta: [id] })
            .then( (course) => {
                // course.ta.push(id)
                // course.ta = [id]
                res.redirect('/ta/course/')
            })
            .catch( err => console.log(err))


    })
    .catch( err => console.log(err) )

})

router.get('/:id/edit',checkLoggedUser,checkRoles('TA') , (req, res) => {

})

router.post('/:id/edit',checkLoggedUser,checkRoles('TA') , (req, res) => {

})

router.post('/:id/delete',checkLoggedUser,checkRoles('TA') , (req, res) => {

})








module.exports = router