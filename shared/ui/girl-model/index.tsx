'use client';

import { useGLTF } from '@react-three/drei';
import { Canvas, MeshProps, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import css from './girl-model.module.css';
import clsx from 'clsx';
import { useMediaQuery } from '@/shared/hooks/use-media-query';

function Box(props: MeshProps) {
	const ref = useRef(null);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	useFrame((state, delta) => {
		// @ts-ignore
		if (ref.current !== null) return (ref.current.rotation.x += delta);
	});

	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={event => click(!clicked)}
			onPointerOver={event => (event.stopPropagation(), hover(true))}
			onPointerOut={event => hover(false)}
		>
			<boxGeometry args={[1, 1, 2]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
}

function Model(props: any) {
	const { scene } = useGLTF('/mita.glb'); // помести модель в public/models/
	const ref = useRef();

	useFrame((_, delta) => {
		if (ref.current) {
			// @ts-ignore
			ref.current.rotation.y += delta * 0.5;
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

			setPosition([positionX, -1, 2]);
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobile]);

	return (
		<div id="canvas-container" className={clsx(css.canvasContainer, className)}>
			<Canvas className={css.canvas} style={{ pointerEvents: 'none' }}>
				<Model position={position} scale={2} rotation={[0, -0.5, 0]} />
				{/* <OrbitControls /> */}
			</Canvas>
		</div>
	);
}
