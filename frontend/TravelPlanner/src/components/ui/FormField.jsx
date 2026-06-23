export function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-label">
        {label}
      </label>

      {children}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}