import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../src/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 className="card-title">Homepage</h2>
          <ThemeToggle />
        </div>
        <h3 className="card-subtitle">
          Welcome {user?.firstName} {user?.lastName}
        </h3>

        <button className="btn btn-secondary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}