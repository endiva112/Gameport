import Header from "../components/Header";

function Search() {
  const games = [
    { name: "Hollow Knight", price: "14.99", img: "/assets/hollow_knight.png" },
    { name: "Grand Theft Auto V", price: "19.99", img: "/assets/gta_v.png" },
    { name: "Terraria", price: "9.99", img: "/assets/terraria.png" },
    { name: "Elden Ring", price: "59.99", img: "/assets/elden_ring.png" },
    { name: "Dark Souls III", price: "39.99", img: "/assets/ds3.png" },
    { name: "Cyberpunk 2077", price: "49.99", img: "/assets/cyberpunk.png" },
    { name: "Stardew Valley", price: "14.99", img: "/assets/stardew.png" },
    { name: "Red Dead Redemption 2", price: "39.99", img: "/assets/rdr2.png" },
    { name: "Celeste", price: "19.99", img: "/assets/celeste.png" },
    { name: "The Witcher 3", price: "29.99", img: "/assets/witcher3.png" },
  ];

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
            />
          </div>
        </div>
      </section>

      {/* GRID DE JUEGOS */}
      <section className="pb-5">
        <div className="container">
          <div className="row g-4">

            {games.map((game, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                
                <div
                  className="card h-100"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >

                  <img
                    src={game.img}
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    alt={game.name}
                  />

                  <div className="card-body text-center">

                    <p className="fw-bold mb-2">{game.name}</p>

                    <p
                      className="fw-bold mb-3"
                      style={{ color: "rgb(100,150,100)" }}
                    >
                      ${game.price}
                    </p>

                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

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

export default Search;