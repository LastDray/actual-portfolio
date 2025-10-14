import { MontserratFont } from '@/shared/config/local-font';
import '../shared/styles/global.css';
import '../shared/styles/reset.css';
import { Favicons } from '@/shared/config/favicons';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<Favicons />
			</head>
			<body className={MontserratFont.className}>{children}</body>
		</html>
	);
}
