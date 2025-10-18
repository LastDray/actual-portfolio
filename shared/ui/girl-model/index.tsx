'use client';

import { useGLTF, useAnimations } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import css from './girl-model.module.css';
import clsx from 'clsx';
import { useMediaQuery } from '@/shared/hooks/use-media-query';

function SceneSetup() {
	const { gl } = useThree();

	useEffect(() => {
		gl.toneMappingExposure = 0.9;
		gl.toneMapping = 1;

		gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		gl.outputColorSpace = 'srgb';
	}, [gl]);

	return null;
}

function Model(props: any) {
	const isMobile = useMediaQuery('(max-width: 767px)');

	const { scene, animations } = useGLTF('/mita-animate-70.glb');
	const ref = useRef();
	const { actions } = useAnimations(animations, ref);

	const baseRotation = isMobile ? { x: 0.2, y: 0 } : { x: 0.25, y: -0.3 };
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
				x: baseRotation.x + y * 0.01,
				y: baseRotation.y + x * 0.3,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [isMobile]);

	useFrame((_, delta) => {
		if (ref.current) {
			const lerpFactor = 0.05;

			setCurrentRotation(prev => ({
				x: prev.x + (targetRotation.x - prev.x) * lerpFactor,
				y: prev.y + (targetRotation.y - prev.y) * lerpFactor,
			}));

			// @ts-ignore
			ref.current.rotation.x = currentRotation.x;
			// @ts-ignore
			ref.current.rotation.y = currentRotation.y;
		}
	});

	return <primitive object={scene} ref={ref} {...props} />;
}

export type GirlModelProps = {
	className?: string;
};

export default function GirlModel({ className }: GirlModelProps) {
	const isMobile = useMediaQuery('(max-width: 767px)');

	const [position, setPosition] = useState([2, -1, 2]);

	useEffect(() => {
		const handleResize = () => {
			const positionX = window.innerWidth / 1100;
			if (isMobile) {
				setPosition([positionX / 100, -2, 1]);
				return;
			}

			setPosition([positionX, -1.3, 2]);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	return (
		<div className={clsx(css.canvasContainer, className)}>
			<Canvas
				className={css.canvas}
				style={{ pointerEvents: 'none' }}
				dpr={[1, 2]}
			>
				<SceneSetup />
				<Model position={position} scale={2} />
			</Canvas>
		</div>
	);
}
