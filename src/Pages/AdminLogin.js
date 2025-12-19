import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AdminLogin.css";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true"); // mark admin logged in
      navigate("/addVehicle"); // redirect to Vehicle Form
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="adminLoginPage">
      <div className="adminLoginCard">
        <h2>Admin Login</h2>
        <p className="adminSubtitle">Authorized access only</p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
};

export default AdminLogin;
