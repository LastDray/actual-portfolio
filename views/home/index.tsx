'use client';

import { FooterSection } from '@/views/home/ui/footer-section';
import { AboutSection } from './ui/about-section';
import { EnterSection } from './ui/enter-section';

export const HomePage = () => {
	return (
		<main>
			<EnterSection />
			<AboutSection />
			<FooterSection />
		</main>
	);
};
