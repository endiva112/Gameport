import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}