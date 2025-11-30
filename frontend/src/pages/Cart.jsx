import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQty, removeItem } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  // safe sum
  const total = cart.reduce((sum, it) => {
    const price = Number(it.price) || 0;
    const qty = Number(it.qty) || 0;
    return sum + price * qty;
  }, 0);

  const format = (n) => {
    // show integer rupees, e.g., 1,299
    return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  };

  const handleCheckout = () => {
    if (!user) {
      // redirect to login before checkout
      nav("/login");
      return;
    }
    nav("/checkout");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      <div>
        {cart.map((i) => (
          <div key={i._id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <img src={i.image || "https://via.placeholder.com/80"} alt={i.name} width={80} style={{ objectFit: "cover" }} />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{i.name}</h4>
                <p style={{ margin: "4px 0" }}>Size: {i.size || "-"}</p>
                <p style={{ margin: "4px 0" }}>Price: ₹{i.price ? format(Number(i.price)) : "0"}</p>

                <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                  <label>Qty:</label>
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => updateQty(i._id, Number(e.target.value) || 1)}
                    style={{ width: 60 }}
                  />
                  <button onClick={() => removeItem(i._id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ₹{format(total)}</h3>

      <div style={{ marginTop: 12 }}>
        {!user ? (
          <div>
            <p>Please <Link to="/login">login</Link> to checkout, or continue as guest.</p>
            <button onClick={() => nav("/login")}>Login to Checkout</button>
          </div>
        ) : (
          <button onClick={handleCheckout} disabled={cart.length === 0}>Go to Checkout</button>
        )}
      </div>
    </div>
  );
};

export default Cart;
