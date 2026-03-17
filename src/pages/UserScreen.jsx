import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();

  // Estado de usuario actual
  const [user, setUser] = useState(null);

  // Inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // Al montar, cargo el usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  // Función para actualizar contraseña
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
    } else {
      // Actualizo localStorage
      const updatedUser = { ...user, password: newPassword };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", text: "Contraseña actualizada correctamente" });
    }
  };

  // Función para eliminar cuenta
  const handleDeleteAccount = async () => {
    if (!window.confirm("¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.")) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: "Error al eliminar cuenta" });
    } else {
      localStorage.removeItem("user");
      navigate("/login");
    }
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
            width: "100%"
          }}
        >
          <h2 className="text-white fw-bold mb-4 text-center">Mi cuenta</h2>

          {/* FORM CAMBIAR CONTRASEÑA */}
          <div className="mb-4">
            <h5 className="text-white mb-3">Cambiar contraseña</h5>

            <div className="mb-3">
              <label className="form-label text-white">Contraseña actual</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Nueva contraseña</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Confirmar nueva contraseña</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="btn w-100 fw-bold"
              style={{ background: "#AAA0A5" }}
              onClick={handleUpdatePassword}
            >
              Actualizar contraseña
            </button>

            {message && (
              <p className={`mt-2 ${message.type === "error" ? "text-danger" : "text-success"}`}>
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
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
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

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Account;