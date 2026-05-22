import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

export default function PublicRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}