import {
	updateProfileImgUrl,
	connectMongoDb
} from '../../../db/mongodb/mongoDbUtils';

const updateProfileImage = async (req, res) => {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { profileImgUrl, email, type } = body;

	if (!profileImgUrl || profileImgUrl.trim() === '') {
		return res.status(400).json({ error: 'no title entered' });
	}

	if (!email) {
		return res.status(400).json({ error: 'could not verify email address' });
	}

	try {
		const client = await connectMongoDb();
		const document = await updateProfileImgUrl(
			client,
			email,
			profileImgUrl,
			type
		);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update profile image' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully updated profile image' });
		return;
	} catch (err) {
		console.log('error:', err);
		res
			.status(500)
			.json({ error: 'problem updating profile image in db', err });
	}
};

export default updateProfileImage;
