exports.postPayment = (req, res) => {
	const { userId, amount } = req.body;

	if (!userId || !amount) {
		return res
			.status(400)
			.json({ message: 'User ID and amount are required.' });
	}

	// Simulate a delay and a dummy payment success response
	setTimeout(() => {
		return res.status(200).json({
			message: 'Payment successful (dummy)',
			paymentId: 'dummy_' + Date.now(),
			status: 'success',
			amountPaid: amount,
		});
	}, 1000);
};
