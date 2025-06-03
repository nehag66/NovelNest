const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
				return res.status(400).json({ message: 'User already exists' });

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			user = new User({ name, email, password: hashedPassword });
			await user.save();
			let userId = user.id;
			const accessToken = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '1m' },
			);

			const refreshToken = jwt.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: '1m' },
			);

			res.json({ accessToken, refreshToken, userId });
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
				return res.status(400).json({ message: 'Invalid Credentials' });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ message: 'Invalid Credentials' });
			let userId = user.id;
			
			const payload = { userId: userId.toString(), role: user.role };
			const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: '1d',
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
				userId,
			});
		} catch (err) {
			res.status(500).json({
				error: 'JWT Generation Error',
				details: err.message,
			});
		}
	},
);

router.post('/forgot-password', async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(400)
				.json({ msg: 'No user found with this email' });

		const token = crypto.randomBytes(20).toString('hex');

		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
		await user.save();

		const resetUrl = `http://localhost:4200/reset-password/${token}`;

		// Use nodemailer to send reset email
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		await transporter.sendMail({
			to: user.email,
			subject: 'Password Reset',
			html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 1 hour.</p>`,
		});

		res.json({ msg: 'Reset link sent to email' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

router.post('/reset-password/:token', async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user)
			return res.status(400).json({ msg: 'Token is invalid or expired' });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();
		res.json({ msg: 'Password successfully updated' });
	} catch (err) {
		res.status(500).json({ error: 'Server error' });
	}
});

router.post('/refresh-token', async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken)
		return res.status(401).json({ msg: 'Refresh token required' });

	try {
		// Verify refresh token
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
		const userId = decoded.userId;

		// You could check if the refreshToken is in DB and still valid (optional)

		// Generate new access token
		const newAccessToken = jwt.sign(
			{ userId, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN || '1d',
			},
		);

		res.json({ accessToken: newAccessToken });
	} catch (err) {
		console.error(err);
		return res
			.status(403)
			.json({ msg: 'Invalid or expired refresh token' });
	}
});

module.exports = router;
