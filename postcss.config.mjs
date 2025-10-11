import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		autoprefixer: {},
		'postcss-mixins': {
			mixinsDir: path.resolve(__dirname, 'shared/styles/mixins'),
		},
		'postcss-nested': {},
		'postcss-simple-vars': {
			variables: {
				mobile: '767px',
				'tablet-min': '768px',
				tablet: '1023px',
				'desktop-min': '1024px',
				'mobile-scale-factor': '3.75',
				'tablet-scale-factor': '7.68',
				'desktop-scale-factor': '14.4',
			},
		},
		'postcss-import': {
			path: [path.resolve(__dirname, 'shared/styles')],
		},
	},
};

export default config;
