import React from 'react';
import { connectMongoDb, addDocToDb } from '../../../db/mongodb/mongoDbUtils';
import { validateEmail, isValidZipCode } from '../../../utils/form-validation';

const prepper = async (req, res) => {
	const { email, firstName, lastName, location } = req.body;
	const { address, city, state, zipcode } = location;
	const isValidEmail = validateEmail(email);
	const isValidZip = isValidZipCode(zipcode);
	if (!isValidEmail) {
		res.status(422).json({ message: 'invalid email' });
		return;
	}
	if (!isValidZip) {
		res.status(422).json({ message: 'invalid zipcode' });
		return;
	}

	if (
		!firstName ||
		!lastName ||
		firstName.trim() === '' ||
		lastName.trim() === ''
	) {
		res.status(422).json({ message: 'invalid names' });
		return;
	}
	const prepperDetails = {
		email,
		firstName,
		lastName,
		location,
		favorites: [],
		meals: [],
	};
	if (req.method === 'POST') {
		try {
			const client = await connectMongoDb();
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
		res.status(400).json({ message: 'invalid request' });
	}
};

export default prepper;
