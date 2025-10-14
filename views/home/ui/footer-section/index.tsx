'use client';

import css from './footer-section.module.css';
import clsx from 'clsx';

export const FooterSection = () => {
	return (
		<footer className={css.root}>
			<div className={clsx(css.container, 'container')}>
				<div className={css.content}>
					<div className={css.contactInfo}>
						<h2 className={css.title}>Свяжитесь со мной</h2>
						<p className={css.description}>
							Готов к новым проектам и интересным задачам
						</p>
					</div>

					<div className={css.contacts}>
						<div className={css.contactItem}>
							<span className={css.contactLabel}>Telegram</span>
							<a
								href="https://t.me/LastDray"
								target="_blank"
								rel="noopener noreferrer"
								className={css.contactLink}
							>
								@LastDray
							</a>
						</div>

						<div className={css.contactItem}>
							<span className={css.contactLabel}>Телефон</span>
							<a href="tel:+79887032282" className={css.contactLink}>
								+7 (988) 703-22-82
							</a>
						</div>

						<div className={css.contactItem}>
							<span className={css.contactLabel}>Email</span>
							<a
								href="mailto:andreyfrontend@yandex.ru"
								className={css.contactLink}
							>
								andreyfrontend@yandex.ru
							</a>
						</div>

						<div className={css.contactItem}>
							<span className={css.contactLabel}>Резюме</span>
							<a
								href="https://rostov.hh.ru/resume/0b9bc6e1ff0f6d0eaf0039ed1f37376b776546"
								target="_blank"
								rel="noopener noreferrer"
								className={css.contactLink}
							>
								Посмотреть на hh.ru
							</a>
						</div>
					</div>
				</div>

				<div className={css.additionalInfo}>
					<div className={css.skills}>
						<h3 className={css.skillsTitle}>Технологии</h3>
						<div className={css.skillsList}>
							<span className={css.skill}>React</span>
							<span className={css.skill}>Next.js</span>
							<span className={css.skill}>TypeScript</span>
							<span className={css.skill}>HTML/CSS</span>
							<span className={css.skill}>PostCSS</span>
						</div>
					</div>

					<div className={css.experience}>
						<h3 className={css.experienceTitle}>Опыт</h3>
						<p className={css.experienceText}>
							2+ года разработки веб-приложений
						</p>
						<p className={css.experienceText}>
							Специализация: Frontend разработка
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
