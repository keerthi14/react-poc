import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic if needed
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center", border: "1px solid #eee", borderRadius: 8, padding: 32, background: "#fafcff" }}>
      <h2 style={{ marginBottom: 32 }}>Welcome to Home Page</h2>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 24px",
          borderRadius: 4,
          border: "none",
          background: "#1976d2",
          color: "#fff",
          fontWeight: 600,
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;