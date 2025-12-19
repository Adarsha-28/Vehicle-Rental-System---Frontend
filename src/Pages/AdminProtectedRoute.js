import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("adminAuth"); // check admin login
  if (!isAdmin) {
    return <Navigate to="/adminlogin" />; // redirect to admin login if not
  }
  return children; 
};

export default AdminProtectedRoute;
  