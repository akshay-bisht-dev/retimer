// Renders a headline as masked lines for maskReveal(). `as` sets the heading level.
export function SplitLines({ lines, as: Tag = 'h2', className = '', ...rest }) {
  return (
    <Tag className={`split ${className}`} {...rest}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className="line__inner">{line}</span>
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
