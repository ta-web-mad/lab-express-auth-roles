const router = require('express').Router();

const { userLogged, accessRoles, idFormat } = require('../middleware');
const User = require('../models/user.model');
const Course = require('./../models/course.model');

router.get('/', userLogged, (req, res) => {
	const isTA = req.session.currentUser.role === 'TA';

	Course.find()
		.then((courses) => res.render('courses/', { courses, isTA }))
		.catch((err) => console.error(err));
});

router.get('/create', userLogged, accessRoles('TA'), (req, res) => {
	User.find()
		.then((users) => {
			const devs = users.filter((user) => user.role === 'DEV');
			const tas = users.filter((user) => user.role === 'TA');
			const students = users.filter((user) => user.role === 'STUDENT');

			res.render('courses/new-course', { devs, tas, students });
		})
		.catch((err) => console.error(err));
});

router.post('/create', userLogged, accessRoles('TA'), (req, res) => {
	const { title } = req.body;

	// res.send({ title, leadTeacher, startDate, endDate, ta, courseImg, description, status, students });

	Course.findOne({ title })
		.then((course) => {
			console.log(course);
			if (course || !title) {
				User.find()
					.then((users) => {
						const devs = users.filter((user) => user.role === 'DEV');
						const tas = users.filter((user) => user.role === 'TA');
						const students = users.filter((user) => user.role === 'STUDENT');

						res.render('courses/new-course', { devs, tas, students, errorMsg: 'The course already exists' });
					})
					.catch((err) => console.error(err));
				return;
			}

			Course.create(req.body)
				.then(() => res.redirect('/courses'))
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
});

router.get('/:id', userLogged, idFormat, (req, res) => {
	const isTA = req.session.currentUser.role === 'TA';

	Course.findById(req.params.id)
		.populate('leadTeacher')
		.populate('ta')
		.populate('students')
		.then((course) => {
			if (!course) {
				res.redirect('/courses');
				return;
			}

			let { startDate, endDate } = course;
			startDate = startDate.toISOString().split('T')[0];
			endDate = endDate.toISOString().split('T')[0];

			res.render('courses/course-details', { course, startDate, endDate, isTA });
		})
		.catch((err) => console.error(err));
});

router.get('/:id/edit', userLogged, idFormat, accessRoles('TA'), (req, res, next) => {
	User.find()
		.then((users) => {
			const devs = users.filter((user) => user.role === 'DEV');
			const tas = users.filter((user) => user.role === 'TA');
			const students = users.filter((user) => user.role === 'STUDENT');

			Course.findById(req.params.id)
				.then((course) => {
					const selDevs = devs.map((dev) => {
						return { dev, selected: course.leadTeacher.includes(dev.id) };
					});

					const selTas = tas.map((ta) => {
						return { ta, selected: course.ta.includes(ta.id) };
					});

					const selStudents = students.map((stud) => {
						return { stud, selected: course.students.includes(stud.id) };
					});

					const isOn = course.status === 'ON';

					res.render('courses/course-edit', { selDevs, selTas, selStudents, isOn, course });
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
});

router.post('/:id/edit', userLogged, accessRoles('TA'), (req, res, next) => {
	const { title } = req.body;

	Course.findOne({ title })
		.then((course) => {
			console.log(course);
			if ((course && course._id != req.params.id) || !title) {
				User.find()
					.then((users) => {
						const devs = users.filter((user) => user.role === 'DEV');
						const tas = users.filter((user) => user.role === 'TA');
						const students = users.filter((user) => user.role === 'STUDENT');

						res.render('courses/new-course', { devs, tas, students, course, errorMsg: 'The course already exists' });
					})
					.catch((err) => console.error(err));
				return;
			}

			Course.findByIdAndUpdate(req.params.id, req.body)
				.then(() => res.redirect('/courses/' + req.params.id))
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
});

router.post('/:id/delete', userLogged, accessRoles('TA'), (req, res) => {
	Course.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/courses'))
		.catch((err) => console.error(err));
});

router.post('/:id/join', userLogged, accessRoles('STUDENT'), (req, res) => {
	Course.findById(req.params.id)
		.populate('leadTeacher')
		.populate('ta')
		.populate('students')
		.then((course) => {
			const { students } = course;
			const studIds = students.map((stud) => stud.id);
			if (studIds.includes(req.session.currentUser._id)) {
				let { startDate, endDate } = course;
				startDate = startDate.toISOString().split('T')[0];
				endDate = endDate.toISOString().split('T')[0];

				res.render('courses/course-details', { course, startDate, endDate, errorMsg: 'You are already enroled in this course' });
				return;
			} else students.push(req.session.currentUser._id);

			Course.findByIdAndUpdate(req.params.id, { students })
				.then(() => res.redirect('/courses/' + req.params.id))
				.catch((err) => console.log(err));
		});
});

module.exports = router;
