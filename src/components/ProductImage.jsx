// Responsive <img> from an asset manifest entry. Below-the-fold by default.
export function ProductImage({ asset, sizes = '100vw', priority = false, className, alt, ...rest }) {
  return (
    <img
      src={asset.src}
      srcSet={asset.srcSet}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt ?? asset.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      {...rest}
    />
  );
}
