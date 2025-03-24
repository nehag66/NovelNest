const jwt = require('jsonwebtoken');
// Middleware to verify token
function verifyToken(req, res, next) {
	const authHeader = req.header('Authorization'); // Full header: "Bearer token"

	if (!authHeader) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	const token = authHeader.split(' ')[1]; // Extract only the token

	if (!token) {
		return res
			.status(401)
			.json({ msg: 'Token missing from Authorization header' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		console.error('JWT Verification Error:', err);
		res.status(401).json({ message: 'Invalid token!' });
	}
}

module.exports = verifyToken;
