import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import PrepperCard from '../../components/Card/prepperCard';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import styles from './index.module.css';
import {
	findAllInCollection,
	connectMongoDb,
	findExistingUserEmail,
	findLocalPreppersWithZipcode
} from '../../db/mongodb/mongoDbUtils';
import SuccessAlert from '../../components/UI/alert/successAlert';
import ErrorAlert from '../../components/UI/alert/ErrorAlert';
import { Alert } from '@mui/material';

export async function getServerSideProps({ req, res }) {
	try {
		const client = await connectMongoDb();
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			const allPreppers = await findAllInCollection(client, 'preppers');
			return {
				props: {
					preppers: allPreppers || [],
					userEmail: null,
					favoritesList: []
				}
			};
		}

		const localPreppers = await findLocalPreppersWithZipcode(
			client,
			session?.user?.defaultZipcode
		);
		const userEmail = session?.user?.email;
		const userDefaultZipcode = session?.user?.defaultZipcode;
		const userDocument =
			userEmail && (await findExistingUserEmail(client, userEmail));
		const favoritesList = userDocument.favorites.map(
			(favPrepper) => favPrepper.id
		);

		return {
			props: {
				preppers: localPreppers || [],
				userEmail: userEmail ? userEmail : null,
				favoritesList: favoritesList || [],
				defaultZipcode: userDefaultZipcode ? userDefaultZipcode : ''
			}
		};
	} catch (err) {
		console.error('could not find preppers', err);
		return {
			props: {
				preppers: []
			}
		};
	}
}

const Home = ({ preppers, userEmail, favoritesList, defaultZipcode }) => {
	const itemsPerPages = 8;
	const count = preppers.length;
	const pages = Math.ceil(count / itemsPerPages);
	const [msg, setMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [preppersList, setPreppersList] = useState([]);
	const [pag, setPag] = useState({ start: 0, end: itemsPerPages });

	useEffect(() => {
		const slicedList = preppers.slice(pag.start, pag.end);
		setPreppersList(slicedList);
	}, [pag]);

	const handleChange = (event, page) => {
		const newStart = Math.ceil((page - 1) * itemsPerPages);
		const newEnd = newStart + itemsPerPages;
		setPag({ ...pag, start: newStart, end: newEnd });
	};

	return (
		<Box height="100%" mx={'3rem'} flexDirection={'column'} display="flex">
			<Head>
				<title>Local Preppers</title>
				<meta name="description" content="List of all preppers in your area" />
			</Head>
			<Box>
				<Typography
					sx={{ my: '2em' }}
					color={'secondary'}
					textAlign={'center'}
					variant="h1"
				>
					Local Meal Preppers {defaultZipcode ? `in ${defaultZipcode}` : ''}
				</Typography>
				{preppersList.length > 0 ? (
					<Box display={'flex'} flexDirection={'column'}>
						<Box
							display="flex"
							justifyContent={'center'}
							gap={4}
							flexWrap={'wrap'}
						>
							{preppersList.map((prepper) => {
								const avatar = 'https://i.pravatar.cc/300';

								const favorited =
									favoritesList && favoritesList.includes(prepper.id)
										? true
										: false;
								if (prepper.email !== userEmail) {
									return (
										<PrepperCard
											isFavorited={favorited}
											className={styles.prepCard}
											key={prepper.id}
											name={prepper.kitchenTitle}
											email={prepper.email}
											subTitle={prepper.name}
											avatar={prepper.profileImgUrl || avatar}
											kitchenImgUrl={prepper.kitchenImgUrl}
											id={prepper.id}
											userEmail={userEmail ? userEmail : ''}
											description={prepper.description}
											setMsg={setMsg}
											setErrorMsg={setErrorMsg}
											mealsServed={prepper.mealsServed}
										/>
									);
								}
							})}
						</Box>
						{pages > 1 && (
							<Pagination
								sx={{ display: 'flex', justifyContent: 'center', my: '2rem' }}
								size="large"
								count={pages}
								onChange={handleChange}
							/>
						)}
					</Box>
				) : (
					<Box
						width={'100%'}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Alert
							severity="error"
							sx={{
								width: '50%'
							}}
						>
							<Typography textAlign={'center'} variant="h2">
								No preppers available nearby.
							</Typography>
						</Alert>
					</Box>
				)}
			</Box>
			{msg && <SuccessAlert msg={msg} setMsg={setMsg} width="50%" />}
			{errorMsg && (
				<ErrorAlert error={errorMsg} setError={setErrorMsg} width="50%" />
			)}
		</Box>
	);
};

export default Home;
