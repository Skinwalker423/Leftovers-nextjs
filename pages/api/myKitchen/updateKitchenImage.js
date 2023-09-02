import {
	addKitchenImgUrl,
	connectMongoDb
} from '../../../db/mongodb/mongoDbUtils';

const updateKitchenImage = async (req, res) => {
	if (req.method !== 'PATCH') {
		return res.status(400).json({ error: 'Invalid request method' });
	}
	const body = req.body;
	console.log(body);
	const { kitchenImgUrl, email } = body;

	if (!kitchenImgUrl || kitchenImgUrl.trim() === '') {
		return res.status(400).json({ error: 'no title entered' });
	}

	if (!email) {
		return res.status(400).json({ error: 'could not verify email address' });
	}

	try {
		const client = await connectMongoDb();
		const document = await addKitchenImgUrl(client, email, kitchenImgUrl);

		if (!document || !document.modifiedCount) {
			client.close();
			res.status(500).json({ error: 'could not update kitchen image' });
			return;
		}
		client.close();
		res.status(200).json({ message: 'Successfully updated kitchen image' });
		return;
	} catch (err) {
		console.log('error:', err);
		res.status(500).json({ error: 'problem updating image in db', err });
	}
};

export default updateKitchenImage;
