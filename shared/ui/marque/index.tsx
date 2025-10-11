import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface MarqueeProps {
	speed: number;
	children: ReactNode;
	className?: string;
	gap?: number;
}

export const Marque: React.FC<MarqueeProps> = ({
	speed,
	children,
	gap = 10,
}) => {
	const [direction, setDirection] = useState<'left' | 'right'>('right');
	const [offset, setOffset] = useState(0);
	const [contentWidth, setContentWidth] = useState(0);
	const marqueeRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number | null>(null);
	const lastTimeRef = useRef<number>(0);

	useEffect(() => {
		if (contentRef.current) {
			setContentWidth(contentRef.current.getBoundingClientRect().width);
		}
	}, [children]);

	useEffect(() => {
		const handleWheel = (event: WheelEvent) => {
			if (event.deltaY > 0) {
				setDirection('right');
			} else if (event.deltaY < 0) {
				setDirection('left');
			}
		};

		window.addEventListener('wheel', handleWheel);
		return () => window.removeEventListener('wheel', handleWheel);
	}, []);

	useEffect(() => {
		const animate = (time: number) => {
			if (lastTimeRef.current === 0) {
				lastTimeRef.current = time;
			}
			const deltaTime = (time - lastTimeRef.current) / 1000;
			lastTimeRef.current = time;

			setOffset(prevOffset => {
				const moveDistance = speed * deltaTime;
				let newOffset =
					direction === 'right'
						? prevOffset - moveDistance
						: prevOffset + moveDistance;

				if (direction === 'right') {
					if (newOffset <= -contentWidth) {
						newOffset += contentWidth;
					}
				} else {
					if (newOffset >= 0) {
						newOffset -= contentWidth;
					}
				}

				return newOffset;
			});

			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animationFrameRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [direction, speed, contentWidth]);

	const content = (
		<div
			ref={contentRef}
			style={{ display: 'flex', whiteSpace: 'nowrap', gap: `${gap}px` }}
		>
			{children}
		</div>
	);

	return (
		<div
			style={{
				overflow: 'hidden',
				position: 'relative',
				width: '100%',
			}}
		>
			<div
				ref={marqueeRef}
				style={{
					display: 'flex',
					position: 'relative',
					transform: `translateX(${offset}px)`,
					willChange: 'transform',
					gap: `${gap}px`,
				}}
			>
				{content}
				{content}
			</div>
		</div>
	);
};
