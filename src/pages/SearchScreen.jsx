import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";

function Search() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Traer todos los productos
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .not("category", "eq", "tarjetas"); // solo juegos

      if (error) console.error("Error cargando juegos:", error);
      else setGames(data);
    }

    fetchProducts();
  }, []);

  // Filtrar por nombre
  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#4A4E69", minHeight: "100vh", color: "white" }}>
      {/* HEADER */}
      <Header />

      {/* FILTRO */}
      <section className="py-4">
        <div className="container">
          <div className="d-flex justify-content-center">
            <input
              type="text"
              placeholder="Buscar juego..."
              className="form-control form-control-lg"
              style={{ maxWidth: "500px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* GRID DE JUEGOS */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">
            {filteredGames.map((game) => (
              <div key={game.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card h-100"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onClick={() => navigate(`/product/${game.id}`)} // va a la página de producto
                >
                  <img
                    src={game.image_url}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    alt={game.name}
                  />
                  <div className="card-body text-center">
                    <p className="fw-bold mb-2">{game.name}</p>
                    <p className="fw-bold mb-3" style={{ color: "rgb(100,150,100)" }}>
                      ${game.price}€
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Search;