import { hashPassword } from '../../../utils/bcrypt';
import {
	connectMongoDb,
	addDocToDb,
	findExistingUserEmail
} from '../../../db/mongodb/mongoDbUtils';
import { validateEmail } from '../../../utils/form-validation';

const user = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(400).json({ error: 'invalid request' });
	}
	const { email, password, confirmPassword } = req.body;

	const isValidEmail = validateEmail(email);

	if (!isValidEmail) {
		res.status(400).json({ error: 'invalid email' });
		return;
	}

	if (password !== confirmPassword) {
		res.status(400).json({ error: 'password does not match' });
	}

	const hashedPassword = await hashPassword(password);

	const userDetails = {
		email,
		favorites: [],
		password: hashedPassword,
		name: null,
		image: null,
		createdAt: new Date(),
		forgotPasswordToken: undefined,
		forgotPasswordTokenExpiry: undefined,
		verifyToken: undefined,
		verifyTokenExpiry: undefined,
		isVerified: false,
		defaultZipcode: null
	};

	try {
		const client = await connectMongoDb();

		//check for existing user email

		const userFound = await findExistingUserEmail(client, email);

		if (userFound) {
			res.status(400).json({
				error: 'Email already in use. Choose another email or please sign in'
			});
			return;
		}

		const doc = await addDocToDb(client, 'users', userDetails);
		client.close();
		res.status(200).json({ message: 'Succesfully signed up!', user: doc });
	} catch (err) {
		client.close();
		res
			.status(500)
			.json({ message: 'something went wrong with connecting to mongodb' });
	}
};

export default user;
