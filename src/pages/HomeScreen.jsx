function Home() {
  const popularGames = [
    { name: "Hollow Knight", img: "/assets/hollow_knight.png" },
    { name: "Grand Theft Auto V", img: "/assets/gta_v.png" },
    { name: "Terraria", img: "/assets/terraria.png" },
  ];

  const cards = [
    { name: "Steam", img: "/assets/steam_card.png" },
    { name: "PlayStation Store", img: "/assets/ps_card.png" },
    { name: "Xbox Gift Card", img: "/assets/xbox_card.png" },
  ];

  return (
    <div style={{ background: "#4A4E69", minHeight: "100vh" }}>
      {/* HEADER */}
      <header className="container-fluid py-3" style={{ background: "#22223B" }}>
        <div className="container d-flex align-items-center justify-content-between">
          <img src="/assets/logo.png" alt="logo" style={{ height: "50px" }} />
          <div className="d-flex gap-4">
            <a href="#" className="text-white">Tarjetas</a>
            <a href="#" className="text-white">Xbox</a>
            <a href="#" className="text-white">PlayStation</a>
            <a href="#" className="text-white">Nintendo</a>
          </div>
        </div>
      </header>

      {/* POPULAR GAMES */}
      <section className="container my-5">
        <h2 className="text-white mb-4">LOS MÁS POPULARES</h2>
        <div className="d-flex gap-4 overflow-auto">
          {popularGames.map(game => (
            <div key={game.name} className="flex-shrink-0" style={{ width: "200px" }}>
              <img src={game.img} alt={game.name} className="img-fluid rounded" />
              <p className="text-center text-white mt-2">{game.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="container my-5">
        <h2 className="text-white mb-4">Tarjetas</h2>
        <div className="row g-4">
          {cards.map(card => (
            <div className="col-md-4" key={card.name}>
              <div className="card h-100">
                <img src={card.img} className="card-img-top" alt={card.name} />
                <div className="card-body">
                  <h5 className="card-title">{card.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container-fluid py-5" style={{ background: "#22223B", color: "#FFF" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h3>¿Aún no tienes cuenta?</h3>
            <button className="btn mt-2" style={{ background: "#AAA0A5", fontWeight: "bold" }}>
              Crear una cuenta
            </button>
          </div>
          <h2 className="fw-bold">Juega más, paga menos</h2>
        </div>
      </footer>
    </div>
  );
}

export default Home;