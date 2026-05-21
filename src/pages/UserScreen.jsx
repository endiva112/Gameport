import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

function Account() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleUpdatePassword = async () => {
    setMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: "error", text: "Completa todos los campos" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    if (currentPassword !== user.password) {
      setMessage({ type: "error", text: "Contraseña actual incorrecta" });
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ password: newPassword })
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: "Error al actualizar contraseña" });
      return;
    }

    setMessage({ type: "success", text: "Contraseña actualizada correctamente" });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar tu cuenta?")) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: "Error al eliminar cuenta" });
      return;
    }

    logout();
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>
      <Header />

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="container p-4 rounded"
          style={{
            background: "#3F4360",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h2 className="text-white fw-bold mb-4 text-center">
            Mi cuenta
          </h2>

          {/* CAMBIAR CONTRASEÑA */}
          <div className="mb-4">
            <h5 className="text-white mb-3">Cambiar contraseña</h5>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirmar nueva contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn w-100 fw-bold"
              style={{ background: "#AAA0A5" }}
              onClick={handleUpdatePassword}
            >
              Actualizar contraseña
            </button>

            {message && (
              <p
                className={`mt-2 ${
                  message.type === "error" ? "text-danger" : "text-success"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>

          <hr style={{ borderColor: "#888" }} />

          {/* ACCIONES */}
          <div className="d-flex flex-column gap-3 mt-4">
            <button
              className="btn fw-bold"
              style={{ background: "#AAA0A5" }}
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

            <button
              className="btn fw-bold"
              style={{ background: "#E57373", color: "white" }}
              onClick={handleDeleteAccount}
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Account;