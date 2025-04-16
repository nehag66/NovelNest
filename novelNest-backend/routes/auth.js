const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();
require('dotenv').config();

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
			let userId = user.id;
			const payload = { userId: userId.toString() };
			const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '1m',
				// expiresIn: '1d',
			});

			const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
				expiresIn: '7d',
			});

			// Optional: Save refresh token to DB if you want to manage invalidation
			user.refreshToken = refreshToken;
			await user.save();

			res.json({
				accessToken,
				refreshToken,
				userId
			});
		} catch (err) {
			res.status(500).json({
				error: 'JWT Generation Error',
				details: err.message,
			});
		}
	},
);

router.post('/refresh-token', async (req, res) => {
	const { refreshToken } = req.body;	

	if (!refreshToken)
		return res.status(401).json({ msg: 'Refresh token required' });

	try {
		// Verify refresh token
		const decoded = jwt.verify(
			refreshToken,
			process.env.REFRESH_SECRET,
		);
		const userId = decoded.userId;
		
		// You could check if the refreshToken is in DB and still valid (optional)

		// Generate new access token
		const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || '1d',
		});

		res.json({ accessToken: newAccessToken });
	} catch (err) {
		console.error(err);
		return res
			.status(403)
			.json({ msg: 'Invalid or expired refresh token' });
	}
});

// Get user details (protected route)
/* router.get('/me', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server Error');
	}
}); */

module.exports = router;
