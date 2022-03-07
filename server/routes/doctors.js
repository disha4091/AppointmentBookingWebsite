const Doctor = require('../models/doctorProfile');
const express = require('express');
const router = express.Router();

router.route('/registerDoctor').post(async (req, res) => {
	const newDoctor = new Doctor({
		name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    education: req.body.education,
    specializations: req.body.specializations,
    experience: req.body.experience,
    clinicDetails: req.body.clinicDetails,
	});
	await newDoctor.save();
	res.status(201).json({
		status: 'success',
		data: {
			doctor: newDoctor
		}
	});
});

module.exports = router;