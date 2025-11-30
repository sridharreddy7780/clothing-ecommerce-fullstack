import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // wait for auth check
  if (loading) return <p>Loading...</p>;

  // if not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
