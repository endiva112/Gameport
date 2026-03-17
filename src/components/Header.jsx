import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="container-fluid py-3" style={{ background: "#22223B" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <img src="/assets/logo.png" alt="logo" style={{ height: "3vw" }} />

        <div className="d-flex gap-3 align-items-center">
          <a href="/#PC" className="text-white text-decoration-none">PC</a>
          <a href="/#PLAYSTATION" className="text-white text-decoration-none">PlayStation</a>
          <a href="/#XBOX" className="text-white text-decoration-none">Xbox</a>
          <a href="/#NINTENDO" className="text-white text-decoration-none">Nintendo</a>
          <a href="/#TARJETAS" className="text-white text-decoration-none">Tarjetas</a>

          <button
            onClick={() => navigate("/search")}
            className="btn fw-bold d-flex align-items-center justify-content-center"
            style={{ background: "#AAA0A5", borderRadius: "8px", padding: "0.5rem" }}
          >
            <img
              src="/icons/searchIcon.png"
              alt="Buscar"
              style={{ height: "24px", width: "24px", objectFit: "contain" }}
            />
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="btn fw-bold d-flex align-items-center justify-content-center"
            style={{ background: "#AAA0A5", borderRadius: "8px", padding: "0.5rem" }}
          >
            <img
              src="/icons/shoppingIcon.png"
              alt="Mi carrito"
              style={{ height: "24px", width: "24px", objectFit: "contain" }}
            />
          </button>

          <button
            onClick={() => navigate("/user")}
            className="btn fw-bold d-flex align-items-center justify-content-center"
            style={{ background: "#AAA0A5", borderRadius: "8px", padding: "0.5rem" }}
          >
            <img
              src="/icons/userIcon.png"
              alt="Usuario"
              style={{ height: "24px", width: "24px", objectFit: "contain" }}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;