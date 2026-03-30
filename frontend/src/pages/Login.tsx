import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Inline validation
  const validate = (): boolean => {
    let isValid = true;
    if (username.trim().length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      isValid = false;
    } else {
      setUsernameError("");
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError(""); // Reset form-level error

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        navigate("/home");
      } else {
        setFormError(data.error ?? data.message ?? "An error occurred");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = loading || !username || !password;

  return (
    <div style={{
      maxWidth: 400, 
      margin: "60px auto", 
      padding: 32,
      border: "1px solid #ccc", 
      borderRadius: 8, 
      background: "#fafafa"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="username" style={{ display: "block", fontWeight: 500 }}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            autoComplete="username"
            disabled={loading}
            onChange={e => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError("");
            }}
            style={{ width: "100%", padding: 8, marginTop: 4, boxSizing: "border-box" }}
          />
          {usernameError && (
            <span style={{ color: "red", fontSize: 13 }}>{usernameError}</span>
          )}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="password" style={{ display: "block", fontWeight: 500 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            autoComplete="current-password"
            disabled={loading}
            onChange={e => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            style={{ width: "100%", padding: 8, marginTop: 4, boxSizing: "border-box" }}
          />
          {passwordError && (
            <span style={{ color: "red", fontSize: 13 }}>{passwordError}</span>
          )}
        </div>
        {formError && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {formError}
          </div>
        )}
        <button
          type="submit"
          disabled={isButtonDisabled}
          style={{
            width: "100%",
            padding: 10,
            background: isButtonDisabled ? "#ccc" : "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            cursor: isButtonDisabled ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;