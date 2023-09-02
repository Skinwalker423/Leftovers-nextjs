import { mockDataContacts } from '../../db/mockData';

async function getFavoritePreppers(req, res) {
	if (req.method === 'GET') {
		const findFavPreppers = mockDataContacts.filter(
			(prepper) => prepper.favorite
		);
		if (findFavPreppers) {
			res.status(200).json(findFavPreppers);
		} else {
			console.log({ findFavPreppers });
			res.status(500).json({ data: 'no favorites found' });
		}
	} else {
		res.status(400).send({ error: 'Not an authorized request' });
	}
}

export default getFavoritePreppers;
