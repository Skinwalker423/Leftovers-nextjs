import React from 'react';

export async function getServerSideProps({ params }) {
	console.log(params);
}

const Directions = () => {
	return <div>Directions</div>;
};

export default Directions;
