'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import {
	MOBILE_BREAKPOINT,
	DESKTOP_BASE_SCALE,
	DESKTOP_BASE_POSITION_X,
	DESKTOP_BASE_POSITION_Y,
	DESKTOP_BASE_POSITION_Z,
	MOBILE_MIN_SCALE,
	MOBILE_MAX_SCALE,
	MOBILE_SCALE_DIVISOR,
	MOBILE_POSITION_X,
	MOBILE_POSITION_Y,
	MOBILE_POSITION_Z,
	BASE_SCREEN_WIDTH,
	DESKTOP_MAX_SCALE_MULTIPLIER,
	DESKTOP_MAX_POSITION_X,
} from '../models/girl-model.constants';

export const useResponsiveModal = () => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

	const [scale, setScale] = useState(DESKTOP_BASE_SCALE);
	const [position, setPosition] = useState([
		DESKTOP_BASE_POSITION_X,
		DESKTOP_BASE_POSITION_Y,
		DESKTOP_BASE_POSITION_Z,
	]);

	useEffect(() => {
		const handleResize = () => {
			if (isMobile) {
				const mobileScale = Math.max(
					MOBILE_MIN_SCALE,
					Math.min(MOBILE_MAX_SCALE, window.innerWidth / MOBILE_SCALE_DIVISOR)
				);
				setScale(mobileScale);
				setPosition([MOBILE_POSITION_X, MOBILE_POSITION_Y, MOBILE_POSITION_Z]);
				return;
			}

			const currentWidth = window.innerWidth;
			const scaleMultiplier = currentWidth / BASE_SCREEN_WIDTH;

			const limitedScaleMultiplier = Math.min(
				scaleMultiplier,
				DESKTOP_MAX_SCALE_MULTIPLIER
			);
			const finalScale = DESKTOP_BASE_SCALE * limitedScaleMultiplier;
			setScale(finalScale);

			const positionX = Math.min(
				DESKTOP_BASE_POSITION_X * limitedScaleMultiplier,
				DESKTOP_MAX_POSITION_X
			);
			setPosition([
				positionX,
				DESKTOP_BASE_POSITION_Y,
				DESKTOP_BASE_POSITION_Z,
			]);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	return { scale, position };
};
