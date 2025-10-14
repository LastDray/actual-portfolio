import { useEffect, useRef } from 'react';

// 🎯 Константы конфигурации
const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.1;
const OVERFLOW_THRESHOLD = 50;
const VELOCITY_DAMPING = 0.76; // Затухание скорости
const VELOCITY_LERP = 0.08; // Плавность ускорения
const TAIL_MULTIPLIER = 2; // Длина хвоста
const TAIL_MIN = 0.5; // Минимальная длина хвоста
const INITIAL_Z_VELOCITY = 0.001; // Скорость приближения звезд
const STAR_DIVIDER = 10; // Чем больше, тем меньше звезд

type Star = { x: number; y: number; z: number };
type Velocity = { x: number; y: number; tx: number; ty: number; z: number };

// 🎯 Генерация
function generateStars(starCount: number, minScale: number): Star[] {
	return Array.from({ length: starCount }, () => ({
		x: 0,
		y: 0,
		z: minScale + Math.random() * (1 - minScale),
	}));
}

function placeStar(star: Star, width: number, height: number) {
	star.x = Math.random() * width;
	star.y = Math.random() * height;
}

function recycleStar(
	star: Star,
	width: number,
	height: number,
	velocity: Velocity
) {
	let direction: 'z' | 'l' | 'r' | 't' | 'b' = 'z';
	const vx = Math.abs(velocity.x * 20);
	const vy = Math.abs(velocity.y * 20);

	if (vx > 1 || vy > 1) {
		let axis: 'h' | 'v';
		if (vx > vy) {
			axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
		} else {
			axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
		}
		if (axis === 'h') {
			direction = velocity.x > 0 ? 'l' : 'r';
		} else {
			direction = velocity.y > 0 ? 't' : 'b';
		}
	}

	star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

	switch (direction) {
		case 'z':
			star.z = 0.1;
			star.x = Math.random() * width;
			star.y = Math.random() * height;
			break;
		case 'l':
			star.x = -OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
			break;
		case 'r':
			star.x = width + OVERFLOW_THRESHOLD;
			star.y = height * Math.random();
			break;
		case 't':
			star.x = width * Math.random();
			star.y = -OVERFLOW_THRESHOLD;
			break;
		case 'b':
			star.x = width * Math.random();
			star.y = height + OVERFLOW_THRESHOLD;
			break;
	}
}

function resizeCanvas(
	canvas: HTMLCanvasElement,
	stars: Star[],
	scale: number,
	width: number,
	height: number
) {
	canvas.width = width;
	canvas.height = height;
	stars.forEach(star => placeStar(star, width, height));
}

function updateStars(
	stars: Star[],
	velocity: Velocity,
	width: number,
	height: number
) {
	velocity.tx *= VELOCITY_DAMPING;
	velocity.ty *= VELOCITY_DAMPING;
	velocity.x += (velocity.tx - velocity.x) * VELOCITY_LERP;
	velocity.y += (velocity.ty - velocity.y) * VELOCITY_LERP;

	stars.forEach(star => {
		star.x += velocity.x * star.z;
		star.y += velocity.y * star.z;
		star.x += (star.x - width / 2) * velocity.z * star.z;
		star.y += (star.y - height / 2) * velocity.z * star.z;
		star.z += velocity.z;

		if (
			star.x < -OVERFLOW_THRESHOLD ||
			star.x > width + OVERFLOW_THRESHOLD ||
			star.y < -OVERFLOW_THRESHOLD ||
			star.y > height + OVERFLOW_THRESHOLD
		) {
			recycleStar(star, width, height, velocity);
		}
	});
}

function renderStars(
	ctx: CanvasRenderingContext2D,
	stars: Star[],
	velocity: Velocity,
	scale: number,
	width: number,
	height: number
) {
	ctx.clearRect(0, 0, width, height);
	stars.forEach(star => {
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.lineWidth = STAR_SIZE * star.z * scale;
		ctx.globalAlpha = 0.5 + 0.5 * Math.random();
		ctx.strokeStyle = STAR_COLOR;

		let tailX = velocity.x * TAIL_MULTIPLIER;
		let tailY = velocity.y * TAIL_MULTIPLIER;

		if (Math.abs(tailX) < 0.1) tailX = TAIL_MIN;
		if (Math.abs(tailY) < 0.1) tailY = TAIL_MIN;

		ctx.moveTo(star.x, star.y);
		ctx.lineTo(star.x + tailX, star.y + tailY);
		ctx.stroke();
	});
}

function movePointer(
	x: number,
	y: number,
	pointerX: number | null,
	pointerY: number | null,
	velocity: Velocity,
	scale: number,
	touchInput: boolean
): [number, number] {
	if (pointerX !== null && pointerY !== null) {
		const ox = x - pointerX;
		const oy = y - pointerY;
		velocity.tx += (ox / (8 * scale)) * (touchInput ? 1 : -1);
		velocity.ty += (oy / (8 * scale)) * (touchInput ? 1 : -1);
	}
	return [x, y];
}

// 🎯 Хук
export function useStarfield() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		let scale = window.devicePixelRatio || 1;
		let width = window.innerWidth * scale;
		let height = window.innerHeight * scale;
		const STAR_COUNT = (window.innerWidth + window.innerHeight) / STAR_DIVIDER;

		let pointerX: number | null = null;
		let pointerY: number | null = null;
		let touchInput = false;

		const stars = generateStars(STAR_COUNT, STAR_MIN_SCALE);
		const velocity: Velocity = {
			x: 0,
			y: 0,
			tx: 0,
			ty: 0,
			z: INITIAL_Z_VELOCITY,
		};

		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		resizeCanvas(canvas, stars, scale, width, height);

		function step() {
			if (!ctx) return;

			updateStars(stars, velocity, width, height);
			renderStars(ctx, stars, velocity, scale, width, height);
			requestAnimationFrame(step);
		}
		step();

		function handleResize() {
			if (!canvas) return;

			scale = window.devicePixelRatio || 1;
			width = window.innerWidth * scale;
			height = window.innerHeight * scale;
			resizeCanvas(canvas, stars, scale, width, height);
		}

		function onMouseMove(e: MouseEvent) {
			touchInput = false;
			[pointerX, pointerY] = movePointer(
				e.clientX,
				e.clientY,
				pointerX,
				pointerY,
				velocity,
				scale,
				touchInput
			);
		}

		function onScroll() {
			touchInput = false;
			[pointerX, pointerY] = movePointer(
				window.innerWidth / 2,
				window.scrollY,
				pointerX,
				pointerY,
				velocity,
				scale,
				touchInput
			);
		}

		function onMouseLeave() {
			pointerX = null;
			pointerY = null;
		}

		window.addEventListener('resize', handleResize);
		canvas.addEventListener('mousemove', onMouseMove);
		canvas.addEventListener('touchend', onMouseLeave);
		window.addEventListener('scroll', onScroll);
		document.addEventListener('mouseleave', onMouseLeave);

		return () => {
			window.removeEventListener('resize', handleResize);
			canvas.removeEventListener('mousemove', onMouseMove);
			canvas.removeEventListener('touchend', onMouseLeave);
			document.removeEventListener('mouseleave', onMouseLeave);
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return canvasRef;
}
