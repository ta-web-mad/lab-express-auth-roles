const UserModel = require("../models/User.model")
const { isLoggedIn } = require("../middleware/route.guard");
const isPM = user => user.role === 'PM'


const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})


router.get('/students', isLoggedIn, async (req, res, next) => {
  const allStudents = await UserModel.find()



  res.render('../views/students/students', { allStudents: allStudents, currentUser: req.session.currentUser.isPM })
})


router.get('/student/:id', isLoggedIn, async (req, res, next) => {
  const student = await UserModel.findById(req.params.id)
  console.log("this is" + req.session.currentUser)
  const isOwnProfile = user => user === req.session.currentUser.username
  console.log("!!!!!!!!" + student.username)
  res.render('../views/students/student-details', { student, isOwnProfile: isOwnProfile(student.username) })

})


router.post('/student/:id/delete', async (req, res, next) => {
  await UserModel.findByIdAndRemove(req.params.id)
  res.redirect('/students')
})
router.get('/student/:id/edit', async (req, res, next) => {
  const student = await UserModel.findById(req.params.id)
  res.render("../views/students/student-edit", student)
})
router.post('/student/:id/edit', async (req, res, next) => {
  const { email, userPwd, username, profileImg, description } = req.body


  await UserModel.findByIdAndUpdate(req.params.id, { email, userPwd, username, profileImg, description })
  res.redirect('/students')


})


  +
  router.post('/student/:id/changestatustota', async (req, res, next) => {
    await UserModel.findByIdAndUpdate(req.params.id, { role: "TA" })
    res.redirect('/students')


  })

router.post('/student/:id/changestatustodev', async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.params.id, { role: "DEV" })
  res.redirect('/students')


})
module.exports = router
