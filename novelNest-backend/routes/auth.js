const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const router = express.Router();

// Register a new user
router.post(
	'/register',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user)
				return res.status(400).json({ msg: 'User already exists' });

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			user = new User({ name, email, password: hashedPassword });
			await user.save();

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN },
			);

			res.json({ token });
		} catch (err) {
			res.status(500).send('Server Error');
		}
	},
);

// Login a user
router.post(
	'/login',
	[
		check('email', 'Enter a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		console.log(req.body)
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: 'Invalid Credentials' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: 'Invalid Credentials' });

			const token = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRES_IN },
			);

			res.json({ token });
		} catch (err) {
			res.status(500).send('Server Error');
		}
	},
);

// Get user details (protected route)
router.get('/me', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// Middleware to verify token
function verifyToken(req, res, next) {
	const token = req.header('Authorization');
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Invalid token' });
	}
}

module.exports = router;
