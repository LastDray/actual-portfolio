'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export const SceneSetup = () => {
	const { gl } = useThree();

	useEffect(() => {
		gl.toneMappingExposure = 0.9;
		gl.toneMapping = 1;

		gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		gl.outputColorSpace = 'srgb';
	}, [gl]);

	return null;
};
