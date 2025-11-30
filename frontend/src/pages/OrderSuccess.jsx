import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Placed Successfully!</h2>
      <p>Your order ID: <b>{id}</b></p>

      <Link to="/products">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
