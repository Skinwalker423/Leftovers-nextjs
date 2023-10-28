import { Box, Typography } from '@mui/material';
import React from 'react';
import { UploadButton } from '../../../utils/uploadthing';
import UpdateMealImgForm from '../../UI/form/mykitchen/updateMealImgForm';
import { updateMealImgInDb } from '../../../utils/meals';

const MealImageUpatesOptions = ({
	setMealImage,
	savedMealImages,
	setMsg,
	mealImage,
	prepperEmail,
	mealId,
	setError,
	setSavedMealImages
}) => {
	return (
		<>
			<Typography variant="h4" sx={{ mt: 2 }}>
				Update Meal Picture
			</Typography>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'100%'}
				flexDirection={{ xs: 'column', md: 'row' }}
				gap={1}
				mt={{ xs: 2, md: 2 }}
				px={2}
			>
				<UpdateMealImgForm
					email={prepperEmail}
					setMsg={setMsg}
					currentImg={mealImage}
					savedImages={savedMealImages}
					setMealImage={setMealImage}
					mealId={mealId}
				/>
				<Typography>Or</Typography>
				<UploadButton
					endpoint="imageUploader"
					onClientUploadComplete={async (res) => {
						// Do something with the response
						const imgUrl = res[0].url;
						setMealImage(imgUrl);
						setSavedMealImages((prevImages) => [...prevImages, imgUrl]);
						try {
							const data = await updateMealImgInDb(
								prepperEmail,
								mealId,
								imgUrl,
								'add'
							);
							if (data.message) {
								setMsg(data.message);
							}
						} catch (err) {
							console.error('problem updating qty', err);

							setError(err);
						}
						setTimeout(() => {
							setMsg('');
							setError('');
						}, 3000);
					}}
					onUploadError={(error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
			</Box>
		</>
	);
};

export default MealImageUpatesOptions;
