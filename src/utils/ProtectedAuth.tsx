import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedAuth() {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/" />;
}
