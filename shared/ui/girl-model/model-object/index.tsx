'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import {
	MOBILE_BREAKPOINT,
	MOBILE_BASE_ROTATION_X,
	MOBILE_BASE_ROTATION_Y,
	DESKTOP_BASE_ROTATION_X,
	DESKTOP_BASE_ROTATION_Y,
	MOUSE_SENSITIVITY_X,
	MOUSE_SENSITIVITY_Y,
	ROTATION_LERP_FACTOR,
} from '@/shared/models/girl-model.constants';
import { REPO_NAME } from '@/shared/config/project.contants';

interface ModelObjectProps {
	position?: number[];
	scale?: number;
}

export const ModelObject = (props?: ModelObjectProps) => {
	const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

	const { scene, animations } = useGLTF(`${REPO_NAME}/mita-animate-70.glb`);
	const ref = useRef();
	const { actions } = useAnimations(animations, ref);

	const baseRotation = isMobile
		? { x: MOBILE_BASE_ROTATION_X, y: MOBILE_BASE_ROTATION_Y }
		: { x: DESKTOP_BASE_ROTATION_X, y: DESKTOP_BASE_ROTATION_Y };
	const [targetRotation, setTargetRotation] = useState(baseRotation);
	const [currentRotation, setCurrentRotation] = useState(baseRotation);

	useEffect(() => {
		if (actions && Object.keys(actions).length > 0) {
			const firstAction = Object.values(actions)[0];
			if (firstAction) {
				firstAction.reset().play();
			}
		}
	}, [actions]);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (isMobile) return;

			const x = (event.clientX / window.innerWidth) * 2 - 1;
			const y = -(event.clientY / window.innerHeight) * 2 + 1;

			setTargetRotation({
				x: baseRotation.x + y * MOUSE_SENSITIVITY_X,
				y: baseRotation.y + x * MOUSE_SENSITIVITY_Y,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [isMobile]);

	useFrame((_, delta) => {
		if (ref.current) {
			setCurrentRotation(prev => ({
				x: prev.x + (targetRotation.x - prev.x) * ROTATION_LERP_FACTOR,
				y: prev.y + (targetRotation.y - prev.y) * ROTATION_LERP_FACTOR,
			}));

			// @ts-ignore
			ref.current.rotation.x = currentRotation.x;
			// @ts-ignore
			ref.current.rotation.y = currentRotation.y;
		}
	});

	return <primitive {...props} ref={ref} object={scene} />;
};
