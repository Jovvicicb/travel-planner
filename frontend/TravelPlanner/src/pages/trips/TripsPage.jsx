import { useAuth } from "../../hooks/auth/useAuth";

export function TripsPage() {
  const { user, logout } = useAuth();

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Travel plans</h1>
          <p>Welcome, {user?.fullName}.</p>
        </div>

        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <section className="card">
        <p>Travel plans module will be implemented in the next stage.</p>
      </section>
    </main>
  );
}