import { EmailTypes } from './mailer';

type FormBodyProps = {
	email: string;
	emailType: EmailTypes;
	userId: string;
};

export const requestEmailConfirmation = async (formBody: FormBodyProps) => {
	const response = await fetch('/api/sendEmail/verifyEmail', {
		headers: {
			'Content-type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(formBody)
	});
	const data = await response.json();
	return data;
};
