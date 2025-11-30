import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      // Backend sends error.message
      const msg =
        err?.response?.data?.message || "Invalid login details";
      setError(msg);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      {/* Error message */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", margin: "10px 0" }}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px 0" }}
        />

        <button>Login</button>
      </form>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
