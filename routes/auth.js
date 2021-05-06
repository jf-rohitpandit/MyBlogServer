const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ message: 'Enter correct email and password' });
			return;
		}

		if (!bcrypt.compareSync(password, user.password)) {
			res.status(400).json({ message: 'Enter correct email and password' });
			return;
		}

		const userId = user._id;
		const token = await jwt.sign({ userId }, 'test');

		res.status(200).json({ token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Some error occured!' });
	}
});

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(400).json({ message: 'Enter email and password' });
			return;
		}

		const isuser = await User.findOne({ email });
		if (isuser) {
			res.status(400).json({ message: 'Email already taken' });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			password: hashedPassword,
		});
		await user.save();
		const userId = user._id;

		const token = await jwt.sign({ userId }, 'test');

		res.status(201).json({ token: token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'some error occured!' });
	}
});

module.exports = router;
