import { useState } from "react";
import Header from "../components/Header";

function Cart() {

  const [cart, setCart] = useState([
    { name: "Hollow Knight", price: "14.99€", img: "/assets/silksongImg.jpg" },
    { name: "GTA V", price: "29.99€", img: "/assets/gta_v.png" },
    { name: "Terraria", price: "9.99€", img: "/assets/terraria.png" }
  ]);

  // eliminar item
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // comprar (vaciar carrito)
  const handleBuy = () => {
    setCart([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>

      {/* HEADER */}
      <Header />

      {/* BODY */}
      <main className="flex-grow-1">

        <div className="container py-4">

          {/* 🔙 VOLVER */}
          <button
            className="btn mb-4"
            onClick={() => window.history.back()}
            style={{
              background: "#22223B",
              color: "white",
              borderRadius: "8px"
            }}
          >
            ← Volver
          </button>

          <div
            className="p-4 rounded"
            style={{
              background: "#3F4360",
              maxWidth: "900px",
              margin: "0 auto"
            }}
          >

            <h2 className="text-white fw-bold mb-4">Carrito</h2>

            {cart.length === 0 ? (
              <p className="text-white">Tu carrito está vacío</p>
            ) : (
              <>
                {/* LISTA */}
                <div className="d-flex flex-column gap-3 mb-4">

                  {cart.map((game, i) => (
                    <div
                      key={i}
                      className="d-flex align-items-center p-3 rounded"
                      style={{ background: "#4A4E69" }}
                    >

                      {/* IMAGEN */}
                      <img
                        src={game.img}
                        alt={game.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />

                      {/* INFO */}
                      <div className="ms-3 flex-grow-1 text-white">
                        <h6 className="mb-1">{game.name}</h6>
                        <p className="mb-0">{game.price}</p>
                      </div>

                      {/* ELIMINAR */}
                      <button
                        className="btn btn-sm fw-bold"
                        onClick={() => removeFromCart(i)}
                        style={{
                          background: "#E57373",
                          color: "white"
                        }}
                      >
                        ✕
                      </button>

                    </div>
                  ))}

                </div>

                {/* BOTÓN COMPRAR */}
                <div className="d-flex justify-content-end">
                  <button
                    className="btn fw-bold px-4 py-2"
                    onClick={handleBuy}
                    style={{
                      background: "#6FCF97",
                      color: "#1B4332",
                      fontSize: "18px"
                    }}
                  >
                    Comprar
                  </button>
                </div>
              </>
            )}

          </div>

        </div>

      </main>

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

export default Cart;