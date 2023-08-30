/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		esmExternals: false // THIS IS THE FLAG THAT MATTERS
	},
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'img.icons8.com',
			'images.unsplash.com',
			'lh3.googleusercontent.com',
			'i.pravatar.cc'
		]
	}
};

module.exports = nextConfig;
