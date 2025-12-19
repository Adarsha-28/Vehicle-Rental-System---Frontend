import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("auth"); // check login status

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token"); // if using JWT
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="/image/Quickrent.png" alt="QuickRent Logo" />
        <span>QuickRent</span>
      </div>
      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/vehiclelisting">Vehicles</Link>
        <Link to="/bookinghistory">Book History</Link>
        <Link to="/adminlogin">Admin</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* Conditionally show Login or Logout */}
        {isAuth ? (
          <button
            onClick={logoutHandler}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
