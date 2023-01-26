import { getSession } from 'next-auth/react';
import React from 'react';

export async function getServerSideProps({ req }) {
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: {
				destination: '/myKitchen',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

const signin = () => {
	return <div>signin</div>;
};

export default signin;
