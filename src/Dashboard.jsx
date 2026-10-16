import { useAuth } from "./AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h1>Student Dashboard</h1>

      <p>Welcome, {user.email}!</p>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;