/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'img.icons8.com',
			'images.unsplash.com',
			'lh3.googleusercontent.com',
			'i.pravatar.cc',
		],
	},
};

module.exports = nextConfig;
