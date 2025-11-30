import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");

  const loadProduct = async () => {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.image} width="300" />
      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <label>Size: </label>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        {product.sizes.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <br /><br />

      <button onClick={() => addToCart(product._id, size, 1)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
