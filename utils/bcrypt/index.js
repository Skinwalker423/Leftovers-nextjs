import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
}
export async function comparePassword(password, hashedPassword) {
	try {
		const response = await compare(password, hashedPassword);

		return response;
	} catch (err) {
		console.error('problem comparing passwords', err);
	}
}
