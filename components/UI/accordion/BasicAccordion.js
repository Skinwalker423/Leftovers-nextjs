import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BasicAccordion = ({
	title = 'Title here',
	description = 'description here'
}) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography>{title}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>{description}</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default BasicAccordion;
