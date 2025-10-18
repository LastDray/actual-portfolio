'use client';

import { Canvas } from '@react-three/fiber';
import css from './girl-model.module.css';
import clsx from 'clsx';
import { ModelObject } from './model-object';
import { SceneSetup } from './scene-setup';
import { useResponsiveModal } from '@/shared/hooks/use-responsive-model';

export type GirlModelProps = {
	className?: string;
};

export default function GirlModel({ className }: GirlModelProps) {
	const { scale, position } = useResponsiveModal();

	return (
		<div className={clsx(css.canvasContainer, className)}>
			<Canvas
				className={css.canvas}
				style={{ pointerEvents: 'none' }}
				dpr={[1, 2]}
			>
				<SceneSetup />
				<ModelObject position={position} scale={scale} />
			</Canvas>
		</div>
	);
}
