function Register() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>
      
      {/* HEADER */}
      <header className="container-fluid py-3" style={{ background: "#22223B" }}>
        <div className="container d-flex align-items-center">
          <img src="/assets/logo.png" alt="logo" style={{ height: "3vw" }} />
        </div>
      </header>

      {/* BODY */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div
          className="container p-4 rounded d-flex"
          style={{
            background: "#F2E9E4",
            maxWidth: "1100px",
            height: "50vh",
            alignItems: "center",
          }}
        >
          <div className="row w-100 align-items-center h-100">
            {/* FORM */}
            <div className="col-md-6 d-flex flex-column justify-content-center h-100">
              <h1 className="mb-4" style={{ fontWeight: "bold" }}>Crear cuenta</h1>

              <div className="mb-3 w-100">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" />
              </div>

              <div className="mb-3 w-100">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="termsCheck" />
                <label className="form-check-label" htmlFor="termsCheck">
                  Acepto términos y condiciones
                </label>
              </div>

              <button
                className="btn w-100"
                style={{ background: "#AAA0A5", fontWeight: "bold", fontSize: "18px" }}
              >
                Registrarse
              </button>
            </div>

            {/* INFO / DERECHA */}
            <div className="col-md-6 d-flex flex-column align-items-center text-center h-100 justify-content-center">
              <h2 style={{ fontWeight: "bold" }}>
                Únete a nuestra comunidad<br />de jugadores
              </h2>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="container-fluid d-flex align-items-center justify-content-center" style={{ background: "#22223B", color: "#FFF", height: "200px" }}>
        <div className="container d-flex justify-content-between align-items-center" style={{ maxWidth: "1100px" }}>
          <div className="text-center">
            <h3>¿Ya tienes cuenta?</h3>
            <button
              className="btn mt-2"
              style={{ background: "#AAA0A5", fontWeight: "bold", fontSize: "18px", width: "240px" }}
            >
              Iniciar sesión
            </button>
          </div>

          <div className="text-center text-md-end">
            <h2 className="fw-bold">Juega más, paga menos</h2>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;