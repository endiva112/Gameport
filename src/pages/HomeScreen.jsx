import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";


function Home() {
  const [games, setGames] = useState([]);
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // Traer productos al montar el componente
  useEffect(() => {
    async function fetchProducts() {
      // Juegos (PC, Xbox, PlayStation, Nintendo)
      const { data: gamesData, error: gamesError } = await supabase
        .from("products")
        .select("*")
        .not("category", "eq", "tarjetas"); // todo lo que no sea tarjeta

      if (gamesError) console.error("Error cargando juegos:", gamesError);
      else setGames(gamesData);

      // Tarjetas
      const { data: cardsData, error: cardsError } = await supabase
        .from("products")
        .select("*")
        .eq("category", "tarjetas");

      if (cardsError) console.error("Error cargando tarjetas:", cardsError);
      else setCards(cardsData);
    }

    fetchProducts();
  }, []);

  // MIS TARJETAS
  const renderRow = (items) => (
    <div
      className="d-flex gap-3 overflow-auto pb-3"
      onWheel={(e) => (e.currentTarget.scrollLeft += e.deltaY)}
    >
      {items.map((item) => (
        <div key={item.id} className="flex-shrink-0" style={{ width: "200px" }}>
          <div
            className="card h-100"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.2s"
            }}
            onClick={() => goToProduct(item.id)} // navegación por producto
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={item.image_url}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
              alt={item.name}
            />
            <div className="card-body d-flex align-items-center justify-content-center">
              <p className="fw-bold text-center m-0">{item.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ background: "#4A4E69", minHeight: "100vh", color: "white" }}>
      <Header />

      {/* SECCIONES */}
      <section
        className="py-5"
        style={{ background: "linear-gradient(135deg, #8B0000, #4A4E69)" }}
      >
        <div className="container text-center">
          <h1 className="mb-5 fw-bold">🔥 Juegos más populares</h1>

          {/** Creamos un array con los 3 juegos específicos en el orden deseado */}
          {(() => {
            const popularGames = [
              games.find((g) => g.name.includes("Hollow Knight: Silksong")),
              games.find((g) => g.name.includes("Grand Theft Auto V")),
              games.find((g) => g.name.includes("Elden Ring")),
            ];

            return (
              <div className="row justify-content-center align-items-end g-4">
                {/* Segundo */}
                <div className="col-md-3">
                  <div className="card" style={{ borderRadius: "12px", cursor: "pointer" }} onClick={() => goToProduct(popularGames[1]?.id)}>
                    <img
                      src={popularGames[1]?.image_url}
                      className="card-img-top"
                      style={{ height: "320px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="fw-bold m-0">{popularGames[1]?.name}</p>
                      <small className="text-muted">🥈 #2</small>
                    </div>
                  </div>
                </div>

                {/* Primero */}
                <div className="col-md-4">
                  <div className="card" style={{ borderRadius: "12px", cursor: "pointer" }} onClick={() => goToProduct(popularGames[0]?.id)}>
                    <img
                      src={popularGames[0]?.image_url}
                      className="card-img-top"
                      style={{ height: "360px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="fw-bold m-0">{popularGames[0]?.name}</p>
                      <small className="text-warning">🥇 #1</small>
                    </div>
                  </div>
                </div>

                {/* Tercero */}
                <div className="col-md-3">
                  <div className="card" style={{ borderRadius: "12px", cursor: "pointer" }} onClick={() => goToProduct(popularGames[2]?.id)}>
                    <img
                      src={popularGames[2]?.image_url}
                      className="card-img-top"
                      style={{ height: "320px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="fw-bold m-0">{popularGames[2]?.name}</p>
                      <small className="text-muted">🥉 #3</small>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Filas por categoría */}
      <section className="py-5" style={{ background: "#3F4360" }} id="PC">
        <div className="container">
          <h2 className="mb-4">PC</h2>
          {renderRow(games.filter((g) => g.category === "pc"))}
        </div>
      </section>

      <section className="py-5" style={{ background: "#4A4E69" }} id="PLAYSTATION">
        <div className="container">
          <h2 className="mb-4">PlayStation</h2>
          {renderRow(games.filter((g) => g.category === "playstation"))}
        </div>
      </section>

      <section className="py-5" style={{ background: "#3F4360" }} id="XBOX">
        <div className="container">
          <h2 className="mb-4">Xbox</h2>
          {renderRow(games.filter((g) => g.category === "xbox"))}
        </div>
      </section>

      <section className="py-5" style={{ background: "#4A4E69" }} id="NINTENDO">
        <div className="container">
          <h2 className="mb-4">Nintendo</h2>
          {renderRow(games.filter((g) => g.category === "nintendo"))}
        </div>
      </section>

      <section className="py-5" style={{ background: "#3F4360" }} id="TARJETAS">
        <div className="container">
          <h2 className="mb-4">Tarjetas</h2>
          {renderRow(cards)}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default Home;