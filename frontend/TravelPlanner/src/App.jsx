import { useAuth } from "./hooks/auth/useAuth";

export default function App() {
  const { user, initializing, isAuthenticated, isAdmin, logout } = useAuth();

  if (initializing) {
    return <p>Loading application...</p>;
  }

  return (
    <main>
      <h1>Travel Planner</h1>

      {isAuthenticated ? (
        <>
          <p>Signed in as: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {isAdmin ? "Yes" : "No"}</p>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>User is not authenticated.</p>
      )}
    </main>
  );
}