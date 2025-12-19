import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth"); // check login status

  if (!isAuth) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default UserProtectedRoute;
