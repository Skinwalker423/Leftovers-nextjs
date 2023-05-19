import React from 'react';
import {
	connectMongoDb,
	addDocToDb,
	findExistingPrepperEmail
} from '../../../db/mongodb/mongoDbUtils';
import { validateEmail, isValidZipCode } from '../../../utils/form-validation';

const prepper = async (req, res) => {
	const { email, firstName, lastName, location, kitchenTitle, description } =
		req.body;
	const { address, city, state, zipcode } = location;
	const isValidEmail = validateEmail(email);
	const isValidZip = isValidZipCode(zipcode);
	if (!isValidEmail) {
		res.status(422).json({ error: 'invalid email' });
		return;
	}
	if (!isValidZip) {
		res.status(422).json({ error: 'invalid zipcode' });
		return;
	}
	if (description.length > 240 || kitchenTitle.length > 50) {
		res.status(422).json({ error: 'Description or title is too long' });
		return;
	}

	if (
		!firstName ||
		!lastName ||
		firstName.trim() === '' ||
		lastName.trim() === '' ||
		!description ||
		description.trim() === '' ||
		!kitchenTitle ||
		kitchenTitle.trim() === ''
	) {
		res.status(422).json({ error: 'invalid inputs' });
		return;
	}
	if (
		!state ||
		!address ||
		!city ||
		address.trim() === '' ||
		city.trim() === ''
	) {
		res.status(422).json({ error: 'select a valid State and address' });
		return;
	}
	const prepperDetails = {
		email,
		firstName,
		lastName,
		location,
		meals: [],
		description,
		kitchenTitle,
		kitchenImgUrl: '/art.jpg',
		created_at: new Date()
	};
	if (req.method === 'POST') {
		try {
			const client = await connectMongoDb();

			//check for existing prepper email

			const prepperFound = await findExistingPrepperEmail(client, email);
			console.log('prepperFound:', prepperFound);

			if (prepperFound) {
				res.status(400).json({ error: 'Email already in use' });
				client.close();
				return;
			}

			const doc = await addDocToDb(client, 'preppers', prepperDetails);
			client.close();
			res.status(200).json({ message: 'Succesfully registered!' });
		} catch (err) {
			client.close();
			res
				.status(500)
				.json({ message: 'something went wrong with connecting to mongodb' });
		}
	} else {
		res.status(400).json({ error: 'invalid request' });
	}
};

export default prepper;
