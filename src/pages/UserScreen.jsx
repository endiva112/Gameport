import Header from "../components/Header";

function Account() {

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>

      {/* HEADER */}
      <Header />

      {/* BODY */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">

        <div
          className="container p-4 rounded"
          style={{
            background: "#3F4360",
            maxWidth: "600px",
            width: "100%"
          }}
        >

          <h2 className="text-white fw-bold mb-4 text-center">
            Mi cuenta
          </h2>

          {/* FORM CAMBIAR CONTRASEÑA */}
          <div className="mb-4">

            <h5 className="text-white mb-3">Cambiar contraseña</h5>

            <div className="mb-3">
              <label className="form-label text-white">Contraseña actual</label>
              <input type="password" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Nueva contraseña</label>
              <input type="password" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Confirmar nueva contraseña</label>
              <input type="password" className="form-control" />
            </div>

            <button
              className="btn w-100 fw-bold"
              style={{ background: "#AAA0A5" }}
            >
              Actualizar contraseña
            </button>

          </div>

          <hr style={{ borderColor: "#888" }} />

          {/* ACCIONES */}
          <div className="d-flex flex-column gap-3 mt-4">

            <button
              className="btn fw-bold"
              style={{ background: "#AAA0A5" }}
            >
              Cerrar sesión
            </button>

            <button
              className="btn fw-bold"
              style={{ background: "#E57373", color: "white" }}
            >
              Eliminar cuenta
            </button>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="py-4" style={{ background: "#22223B" }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

          <div className="fw-bold">
            Gameport © 2026
          </div>

          <div className="d-flex gap-4">
            <a href="#" className="text-white text-decoration-none">Contacto</a>
            <a href="#" className="text-white text-decoration-none">Términos</a>
            <a href="#" className="text-white text-decoration-none">Privacidad</a>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Account;