const verifyToken = (req, res) => {
	const { token } = req.query;
	console.log('token', token);

	res.status(200).json(token);
};

export default verifyToken;
