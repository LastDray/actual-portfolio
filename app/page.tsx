import { HomePage } from '@/views/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Андрей - Middle Frontend Developer',
	description:
		'Я Андрей - Middle Frontend Developer. Разрабатываю быстрые и красивые сайты на React, Next.js и TypeScript',
	openGraph: {
		title: 'Андрей - Middle Frontend Developer',
		description:
			'Я Андрей - Middle Frontend Developer. Разрабатываю быстрые и красивые сайты на React, Next.js и TypeScript',
	},
};

export default function Home() {
	return <HomePage />;
}
