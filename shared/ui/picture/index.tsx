import clsx from 'clsx';
import type { FC } from 'react';

export type ImageProps = {
	src: string;
	src2x?: string;
	mobile?: string;
	mobile2x?: string;
	tablet?: string;
	tablet2x?: string;
};

export type ImageSrc = {
	src: string;
	alt: string;
};

export type PosterImageProps = {
	alt?: string;
	original: ImageProps;
	webp?: ImageProps;
	avif?: ImageProps;
};

type PictureProps = {
	poster?: PosterImageProps;
	className?: string;
};

const makeSrcSet = (src?: string, src2x?: string) => {
	if (!src) return undefined;
	return src2x ? `${src} 1x, ${src2x} 2x` : `${src} 1x`;
};

export const Picture: FC<PictureProps> = ({ poster, className, ...props }) => {
	if (!poster) return null;

	const { original, webp, avif, alt } = poster;

	return (
		<picture className={clsx(className)} {...props}>
			{avif?.mobile && (
				<source
					srcSet={makeSrcSet(avif.mobile, avif.mobile2x)}
					media={'(max-width: 767px)'}
					type="image/avif"
				/>
			)}

			{avif?.src && (
				<source srcSet={makeSrcSet(avif.src, avif.src2x)} type="image/avif" />
			)}

			{webp?.mobile && (
				<source
					srcSet={makeSrcSet(webp.mobile, webp.mobile2x)}
					media={'(max-width: 767px)'}
					type="image/webp"
				/>
			)}

			{webp?.src && (
				<source srcSet={makeSrcSet(webp.src, webp.src2x)} type="image/webp" />
			)}

			{original?.mobile && (
				<source
					srcSet={makeSrcSet(original.mobile, original.mobile2x)}
					media={'(max-width: 767px)'}
				/>
			)}

			{original?.src && (
				<source srcSet={makeSrcSet(original.src, original.src2x)} />
			)}

			<img
				src={original.src || original.mobile || original.tablet}
				alt={alt ?? 'img'}
			/>
		</picture>
	);
};
