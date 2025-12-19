import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const isAuth = localStorage.getItem("auth");
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("https://vehicle-rental-system-backend-qtkj.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save auth info in localStorage
      localStorage.setItem("auth", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", data.token); // optional

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="loginPage">
      <form className="loginCard" onSubmit={loginHandler}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue booking vehicles</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#6a11cb", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

