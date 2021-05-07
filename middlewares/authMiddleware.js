const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
	try {
		const token = req.headers['authorization'].split(' ')[1];
		const { userId } = jwt.verify(token, 'test');
		req.userId = userId;
		next();
	} catch (error) {
		res.status(400).json({ message: 'Invalid credentials' });
	}
};

module.exports = verifyUser;
