import React from 'react';
import { signOut } from 'next-auth/react';

async function logout(req, res) {
	try {
		await signOut();
		res.status(200).redirect('/');
	} catch (err) {
		res.status(500).json({ error: 'failed to load data' });
	}
}

export default logout;
