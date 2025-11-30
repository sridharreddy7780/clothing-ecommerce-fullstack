import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  if (!user) return <h2>Please login to checkout.</h2>;

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const placeOrder = async () => {
    const res = await api.post("/orders", {
      items: cart,
      totalPrice: total
    });

    nav(`/order-success/${res.data.order._id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
