export function SectionLabel({ children, className = '' }) {
  return (
    <p className={`label ${className}`}>
      <span className="label__dot" aria-hidden="true" />
      {children}
    </p>
  );
}
