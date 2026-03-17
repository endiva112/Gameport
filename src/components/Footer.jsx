const Footer = () => {
  return (
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
  );
};

export default Footer;