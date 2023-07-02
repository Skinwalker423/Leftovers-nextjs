import React from 'react';

const Map = ({ address, city }) => {
	if (!address || !city) return;
	const queryAddress = address.replaceAll(' ', '%20');
	const ogq =
		'https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=9617%20Van%20Ruiten%20st%20Bellflower&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';
	const query = `${queryAddress}%20${city}`;
	const q = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_KEY}
  &q=${query}`;

	return (
		<iframe
			
			width="520"
			height="400"
			marginheight="0"
			marginwidth="0"
			id="gmap_canvas"
			src={q}
		></iframe>
	);
};

export default Map;
