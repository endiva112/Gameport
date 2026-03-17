import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // para leer el :id de la URL
import { supabase } from "../supabaseClient.js";

function Product() {
  const { id } = useParams(); // id de /producto/:id
  const [game, setGame] = useState(null);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single(); // devuelve un solo objeto
      if (error) {
        console.error("Error cargando producto:", error);
      } else {
        setGame(data);
      }
    }

    fetchGame();
  }, [id]);

  if (!game) return <div className="text-white text-center mt-5">Cargando...</div>;

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>
      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">
          {/* BOTÓN VOLVER */}
          <button
            className="btn m-5"
            onClick={() => window.history.back()}
            style={{ background: "#22223B", color: "white", borderRadius: "8px" }}
          >
            ← Volver
          </button>

          {/* CARD CENTRADA */}
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="container p-4 rounded"
              style={{ background: "#3F4360", maxWidth: "1100px", minHeight: "55vh" }}
            >
              <div className="row h-100 align-items-center">

                {/* IMAGEN */}
                <div className="col-md-6 mb-4 mb-md-0">
                  <img
                    src={game.image_url}
                    alt={game.name}
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "500px" }}
                  />
                </div>

                {/* INFO */}
                <div className="col-md-6 text-white d-flex flex-column justify-content-center">
                  <h1 className="fw-bold mb-3">{game.name}</h1>
                  <p className="mb-2">⭐ {game.rating} / 5</p>
                  <h2 className="fw-bold mb-4" style={{ color: "#A8E6A3" }}>{game.price}€</h2>
                  <p className="mb-4" style={{ lineHeight: "1.6" }}>{game.description}</p>
                  <button
                    className="btn fw-bold"
                    onClick={() => setInCart(!inCart)}
                    style={{
                      background: inCart ? "#6FCF97" : "#AAA0A5",
                      color: inCart ? "#1B4332" : "black",
                      fontSize: "18px",
                      width: "260px",
                      transition: "0.2s"
                    }}
                  >
                    {inCart ? "✔ En el carrito" : "Añadir al carrito"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4" style={{ background: "#22223B" }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="fw-bold">Gameport © 2026</div>
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

export default Product;