/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.bungie.net",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
