import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";
import { useContext } from "react";

export default function RequireAuth({ children }) {
  const { token, user_id } = useContext(AuthContext);
  const location = useLocation();
  if (token === null && user_id === -1) {
    return <Navigate to="/auth/login" state={location} replace />;
  }
  return children;
}
