import Header from "../components/Header";

function Home() {
  const games = [
    { name: "Hollow Knight", img: "/assets/silksongImg.jpg" },
    { name: "Grand Theft Auto V", img: "/assets/gta5Img.jpg" },
    { name: "Terraria", img: "/assets/terrariaImg.jpg" },
    { name: "Hollow Knight", img: "/assets/hollow_knight.png" },
    { name: "Grand Theft Auto V", img: "/assets/gta_v.png" },
    { name: "Terraria", img: "/assets/terraria.png" },
    { name: "Hollow Knight", img: "/assets/hollow_knight.png" },
    { name: "Grand Theft Auto V", img: "/assets/gta_v.png" },
    { name: "Terraria", img: "/assets/terraria.png" },
  ];

  const cards = [
    { name: "Steam", img: "/assets/steam_card.png" },
    { name: "PlayStation Store", img: "/assets/ps_card.png" },
    { name: "Xbox Gift Card", img: "/assets/xbox_card.png" },
  ];

  const renderRow = (items) => (
    <div
      className="d-flex gap-3 overflow-auto pb-3"
      onWheel={(e) => (e.currentTarget.scrollLeft += e.deltaY)}
    >
      {items.map((item, i) => (
        <div key={i} className="flex-shrink-0" style={{ width: "200px" }}>
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
              src={item.img}
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

      {/* HEADER */}
      <Header />

      {/* SECCIONES */}

      {/* base */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #8B0000, #4A4E69)"
        }}
      >
        <div className="container text-center">

          <h1 className="mb-5 fw-bold">🔥 Juegos más populares</h1>

          <div className="row justify-content-center align-items-end g-4">

            {/*Segundo*/}
            <div className="col-md-3">
              <div
                className="card"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  transform: "scale(0.95)",
                  transition: "0.3s"
                }}
              >
                <img
                  src={games[1].img}
                  className="card-img-top"
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="fw-bold m-0">{games[1].name}</p>
                  <small className="text-muted">🥈 #2</small>
                </div>
              </div>
            </div>

            {/*Primero*/}
            <div className="col-md-4">
              <div
                className="card shadow"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  transform: "scale(1.1)",
                  transition: "0.3s"
                }}
              >
                <img
                  src={games[0].img}
                  className="card-img-top"
                  style={{ height: "360px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="fw-bold m-0">{games[0].name}</p>
                  <small className="text-warning">🥇 #1</small>
                </div>
              </div>
            </div>

            {/*Tercero*/}
            <div className="col-md-3">
              <div
                className="card"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  transform: "scale(0.95)",
                  transition: "0.3s"
                }}
              >
                <img
                  src={games[2].img}
                  className="card-img-top"
                  style={{ height: "320px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p className="fw-bold m-0">{games[2].name}</p>
                  <small className="text-muted">🥉 #3</small>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* contraste suave */}
      <section className="py-5" style={{ background: "#3F4360" }} id="PC">
        <div className="container">
          <h2 className="mb-4">PC</h2>
          {renderRow(games)}
        </div>
      </section>

      <section className="py-5" style={{ background: "#4A4E69" }} id="PLAYSTATION">
        <div className="container">
          <h2 className="mb-4">PlayStation</h2>
          {renderRow(games)}
        </div>
      </section>

      <section className="py-5" style={{ background: "#3F4360" }} id="XBOX">
        <div className="container">
          <h2 className="mb-4">Xbox</h2>
          {renderRow(games)}
        </div>
      </section>

      <section className="py-5" style={{ background: "#4A4E69" }} id="NINTENDO">
        <div className="container">
          <h2 className="mb-4">Nintendo</h2>
          {renderRow(games)}
        </div>
      </section>

      <section className="py-5" style={{ background: "#3F4360" }} id="TARJETAS">
        <div className="container">
          <h2 className="mb-4">Tarjetas</h2>
          {renderRow(cards)}
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

export default Home;