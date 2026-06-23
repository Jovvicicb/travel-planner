export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {children}
      </section>
    </main>
  );
}