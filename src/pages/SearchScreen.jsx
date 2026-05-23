import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";

//generacion de informes
import jsPDF from 'jspdf'

function Search() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Trae todos los productos
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

  // Filtro por nombre
  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );


  //region funcion encargada de la generación del informe
  const generatePDF = () => {
    const doc = new jsPDF()
    const hoy = new Date().toLocaleDateString('es-ES')
    let y = 20

    // Título
    doc.setFontSize(18)
    doc.text('Informe de catálogo — Gameport', 20, y)
    y += 8
    doc.setFontSize(10)
    doc.text(`Generado el ${hoy}`, 20, y)
    y += 12

    // Estadísticas globales
    const precios = games.map(g => g.price)
    const total = games.length
    const precioMin = Math.min(...precios).toFixed(2)
    const precioMax = Math.max(...precios).toFixed(2)
    const precioPromedio = (precios.reduce((a, b) => a + b, 0) / total).toFixed(2)

    doc.setFontSize(13)
    doc.text('Estadísticas globales', 20, y)
    y += 7
    doc.setFontSize(11)
    doc.text(`Total de juegos: ${total}`, 20, y); y += 6
    doc.text(`Precio mínimo: ${precioMin}€`, 20, y); y += 6
    doc.text(`Precio máximo: ${precioMax}€`, 20, y); y += 6
    doc.text(`Precio promedio: ${precioPromedio}€`, 20, y); y += 12

    // Estadísticas por plataforma
    const platforms = ['pc', 'playstation', 'xbox', 'nintendo']
    const platformName = { pc: 'PC', playstation: 'PlayStation', xbox: 'Xbox', nintendo: 'Nintendo' }

    doc.setFontSize(13)
    doc.text('Estadísticas por plataforma', 20, y)
    y += 7

    platforms.forEach(plat => {
      const platformGames = games.filter(g => g.category === plat)
      if (platformGames.length === 0) return

      const precsPlat = platformGames.map(g => g.price)
      const min = Math.min(...precsPlat).toFixed(2)
      const max = Math.max(...precsPlat).toFixed(2)
      const prom = (precsPlat.reduce((a, b) => a + b, 0) / platformGames.length).toFixed(2)

      doc.setFontSize(11)
      doc.text(`${platformName[plat]}`, 20, y); y += 6
      doc.setFontSize(10)
      doc.text(`  Juegos: ${platformGames.length}   Mín: ${min}€   Máx: ${max}€   Promedio: ${prom}€`, 20, y)
      y += 8
    })

    y += 4

    // Juegos en más de una plataforma
    const byName = {}
    games.forEach(g => {
      const cleanName = g.name.replace(/^\[.*?\]\s*/, '')
      if (!byName[cleanName]) byName[cleanName] = []
      byName[cleanName].push(g.category)
    })
    const multiplataforma = Object.entries(byName).filter(([, cats]) => cats.length > 1)

    doc.setFontSize(13)
    doc.text('Juegos en más de una plataforma', 20, y)
    y += 7
    doc.setFontSize(10)

    if (multiplataforma.length === 0) {
      doc.text('Ninguno', 20, y)
    } else {
      multiplataforma.forEach(([nombre, cats]) => {
        doc.text(`${nombre}: ${cats.join(', ')}`, 20, y)
        y += 6
      })
    }

    // Generar el archivo en formato pdf
    doc.save(`informe-gameport-${hoy}.pdf`)
  }
  //endregion

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

          {/* BOTON PARA GENERAR INFORMES */}
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn fw-bold"
              style={{ background: '#22223B', color: 'white', borderRadius: '8px' }}
              onClick={generatePDF}
            >
              Descargar informe PDF
            </button>
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