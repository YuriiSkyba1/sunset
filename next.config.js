/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		domains: ["api.sunsetcinema.in-create.online"],
	},
};

module.exports = nextConfig;
