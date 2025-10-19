const repo = 'actual-portfolio';

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: { unoptimized: true },
	basePath: `/${repo}`,
	assetPrefix: `/${repo}/`,
};

export default nextConfig;
