import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import { useAuthStore } from "../zustand/authStore";

function Product() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [inCart, setInCart] = useState(false);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      // Producto
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) {
        console.error("Error cargando producto:", productError);
        return;
      }

      setGame(productData);

      // Ver si está en carrito
      const { data: cartData, error: cartError } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", id)
        .maybeSingle();

      if (cartError) {
        console.error("Error revisando carrito:", cartError);
      } else {
        setInCart(!!cartData);
      }
    }

    fetchData();
  }, [id, user]);

  const handleCartToggle = async () => {
    if (!user) {
      alert("Debes iniciar sesión para usar el carrito");
      return;
    }

    if (inCart) {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (!error) setInCart(false);
    } else {
      const { error } = await supabase
        .from("cart")
        .insert([{ user_id: user.id, product_id: id }]);

      if (!error) setInCart(true);
    }
  };

  if (!game) {
    return (
      <div className="text-white text-center mt-5">
        Cargando...
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#4A4E69" }}>
      <Header />

      <main className="flex-grow-1">
        <div className="container py-4">

          <button
            className="btn m-5"
            onClick={() => window.history.back()}
            style={{ background: "#22223B", color: "white", borderRadius: "8px" }}
          >
            ← Volver
          </button>

          <div className="d-flex justify-content-center align-items-center">
            <div
              className="container p-4 rounded"
              style={{
                background: "#3F4360",
                maxWidth: "1100px",
                minHeight: "55vh",
              }}
            >
              <div className="row h-100 align-items-center">

                {/* IMAGEN */}
                <div className="col-md-6 mb-4 mb-md-0">
                  <img
                    src={game.image_url}
                    alt={game.name}
                    className="img-fluid rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      maxHeight: "500px",
                    }}
                  />
                </div>

                {/* INFO */}
                <div className="col-md-6 text-white d-flex flex-column justify-content-center">
                  <h1 className="fw-bold mb-3">{game.name}</h1>
                  <p className="mb-2">⭐ {game.rating} / 5</p>
                  <h2 className="fw-bold mb-4" style={{ color: "#A8E6A3" }}>
                    {game.price}€
                  </h2>
                  <p className="mb-4" style={{ lineHeight: "1.6" }}>
                    {game.description}
                  </p>

                  <button
                    className="btn fw-bold"
                    onClick={handleCartToggle}
                    style={{
                      background: inCart ? "#6FCF97" : "#AAA0A5",
                      color: inCart ? "#1B4332" : "black",
                      fontSize: "18px",
                      width: "260px",
                      transition: "0.2s",
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

      <Footer />
    </div>
  );
}

export default Product;