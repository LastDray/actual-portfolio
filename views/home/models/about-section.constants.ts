import { REPO_NAME } from '@/shared/config/project.contants';

export const TIMELINE_DATA = [
	{
		title: 'Learner',
		description: `Всё началось 20 сентября 2023 года, когда я загорелся фронтендом и
          начал копаться в курсах на Stepik, YouTube и других платформах.
          Погружался в HTML, CSS, JavaScript и React, пробуя свои силы в учебных
          проектах. Сделал пару лендингов и простеньких приложений — было
          весело, и я реально втянулся!`,
	},
	{
		title: 'Intern',
		description:
			'22 марта 2024 года попал на стажировку в компанию — и понеслось! Впервые поработал над настоящими задачами: верстал интерфейсы, цеплял API, учился жить с Git и разбирался с NextJS. Наставники помогли не запутаться, а я старался впитывать всё, как губка.',
	},
	{
		title: 'Junior',
		description:
			'22 апреля 2024 года стажировка зашла, и меня взяли джуниором! Тут я уже развернулся: делал адаптивные интерфейсы, чинил баги, ускорял загрузку страниц с помощью SSR и SSG и ковырялся с TypeScript. Работал на реальных проектах с NextJS — это был настоящий кайф!',
	},
	{
		title: 'Middle',
		description:
			'В мае 2025 года показал, что могу больше, и мне апнули уровень до мидла! Теперь рулю крупными задачами: строю сложные SPA, оптимизирую всё, что тормозит, и связываю фронт с бэком. Плюс ко всему, делаю код-ревью и помогаю новичкам не теряться. Короче, в деле и готов к новым челленджам!',
	},
];

export const RANGE_CONTENT_HEADER = {
	'0-32': 'Обучение',
	'33-44': 'Cтажировка',
	'45-50': 'Оффер',
	'51-61': 'Опыт работы',
	'62-68': 'Повышение',
	'69-76': 'Опыт работы',
	'77-100': 'Двигаюсь дальше',
};

export const RANGE_CONTENT_VALUE = {
	'0-18': '',
	'19-21': '1 месяц',
	'22-23': '2 месяца',
	'24-26': '3 месяца',
	'27-28': '4 месяца',
	'29-30': '5 месяцев',
	'31-32': '6 месяцев',
	'33-44': '1 месяц',
	'45-50': '',
	'51-52': '1 месяц',
	'52-53': '3 месяца',
	'54-55': '5 месяцев',
	'56-57': '7 месяцев',
	'58-59': '9 месяцев',
	'60-61': '12 месяцев',
	'62-68': '',
	'69-70': '13 месяцев',
	'71-72': '14 месяцев',
	'73-74': '15 месяцев',
	'75-76': '16 месяцев',
	'77-100': '',
};

export const MARQUEE_IMAGES = [
	{
		original: {
			src: `${REPO_NAME}/assets/icons/1.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/1.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/1.avif`,
		},
		alt: 'webpack logo',
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/2.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/2.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/2.avif`,
		},
		alt: 'postcss logo',
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/3.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/3.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/3.avif`,
		},
		alt: `react logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/4.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/4.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/4.avif`,
		},
		alt: `prettier logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/5.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/5.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/5.avif`,
		},
		alt: `eslint logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/6.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/6.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/6.avif`,
		},
		alt: `axios logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/7.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/7.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/7.avif`,
		},
		alt: `react query logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/8.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/8.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/8.avif`,
		},
		alt: `typescript logo`,
	},
	{
		original: {
			src: `${REPO_NAME}/assets/icons/9.png`,
		},
		webp: {
			src: `${REPO_NAME}/assets/icons/9.webp`,
		},
		avif: {
			src: `${REPO_NAME}/assets/icons/9.avif`,
		},
		alt: 'nextjs logo',
	},
];
