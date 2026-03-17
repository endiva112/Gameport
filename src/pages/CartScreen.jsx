import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usuario logueado
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchCart() {
      const { data, error } = await supabase
        .from("cart")
        .select(`product_id, products(name, price, image_url)`)
        .eq("user_id", user.id);

      if (error) console.error("Error cargando carrito:", error);
      else {
        // mapeamos para tener la misma estructura que antes
        const items = data.map((item) => ({
          id: item.product_id,
          name: item.products.name,
          price: item.products.price,
          img: item.products.image_url,
        }));
        setCart(items);
      }
      setLoading(false);
    }

    fetchCart();
  }, [user]);

  const removeFromCart = async (productId) => {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) console.error("Error eliminando del carrito:", error);
    else setCart(cart.filter((item) => item.id !== productId));
  };

  const handleBuy = async () => {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);

    if (error) console.error("Error vaciando carrito:", error);
    else setCart([]);
  };

  if (loading) return <div className="text-white text-center mt-5">Cargando carrito...</div>;
  if (!user) return <div className="text-white text-center mt-5">Debes iniciar sesión para ver tu carrito</div>;

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>
      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">
          {/* VOLVER */}
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
                  {cart.map((game) => (
                    <div
                      key={game.id}
                      className="d-flex align-items-center p-3 rounded"
                      style={{ background: "#4A4E69" }}
                    >
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
                      <div className="ms-3 flex-grow-1 text-white">
                        <h6 className="mb-1">{game.name}</h6>
                        <p className="mb-0">{game.price}€</p>
                      </div>
                      <button
                        className="btn btn-sm fw-bold"
                        onClick={() => removeFromCart(game.id)}
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

      <Footer />
    </div>
  );
}

export default Cart;