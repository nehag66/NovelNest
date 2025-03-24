const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const verifyToken = require('../middlewares/verifyToken');
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
	console.log("userId=====>", req.user)
	try {
		const user = await User.findById(req.user.userId).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

module.exports = router;
