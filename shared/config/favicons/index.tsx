const FAVICONS_CONFIG = [
	{
		rel: 'icon',
		sizes: '512x512',
		href: '/favicons/512.png',
	},
	{
		rel: 'icon',
		sizes: '192x192',
		href: '/favicons/192.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/favicons/180.png',
	},
	{
		rel: 'icon',
		sizes: '96x96',
		href: '/favicons/96.png',
	},
] as const;

export const Favicons = () => {
	return (
		<>
			{FAVICONS_CONFIG.map((favicon, index) => (
				<link {...favicon} key={index} />
			))}
		</>
	);
};
