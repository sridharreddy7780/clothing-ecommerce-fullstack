import { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // { _id, product: productId, name, price, size, qty, image }
  const normalizeServerCart = (serverCart) => {
    // serverCart may be { items: [...] } or array
    const items = serverCart?.items || serverCart || [];
    return items.map((it) => ({
      _id: it._id?.toString() || it.product?.toString() || it.productId || `${it.product}_${it.size}`,
      product: it.product || it.productId,
      name: it.name || it.title || "Item",
      price: Number(it.price) || 0,
      size: it.size || "",
      qty: Number(it.qty) || 1,
      image: it.image || it.thumbnail || ""
    }));
  };

  const loadCart = async () => {
    if (user) {
      try {
        const res = await api.get("/cart");
        setCart(normalizeServerCart(res.data));
      } catch (e) {
        console.error("Failed loading cart:", e);
        setCart([]);
      }
    } else {
      const local = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(local.map(it => ({
        ...it,
        price: Number(it.price) || 0,
        qty: Number(it.qty) || 1
      })));
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  // Add product to cart. For guests — fetch product details and store full item.
  const addToCart = async (productId, size = "M", qty = 1) => {
    if (user) {
      // logged-in: server handles adding (expects productId,size,qty)
      const res = await api.post("/cart/add", { productId, size, qty });
      setCart(normalizeServerCart(res.data));
    } else {
      // guest: fetch product details to grab price/name/image
      try {
        const res = await api.get(`/products/${productId}`);
        const p = res.data;
        const existingIndex = cart.findIndex(
          (it) => it.product === productId && it.size === size
        );
        let updated = [...cart];
        if (existingIndex > -1) {
          updated[existingIndex].qty = Number(updated[existingIndex].qty) + Number(qty);
        } else {
          updated.push({
            _id: productId + "_" + size,
            product: productId,
            name: p.name || p.title || "Item",
            price: Number(p.price) || 0,
            size,
            qty: Number(qty) || 1,
            image: p.image || (p.images && p.images[0]) || ""
          });
        }
        localStorage.setItem("cart", JSON.stringify(updated));
        setCart(updated);
      } catch (err) {
        console.error("Failed to add product for guest:", err);
      }
    }
  };

  const updateQty = async (itemId, newQty) => {
    if (user) {
      // server expects itemId (cart item id) and qty
      try {
        const res = await api.put("/cart/update", { itemId, qty: Number(newQty) });
        setCart(normalizeServerCart(res.data));
      } catch (err) {
        console.error("Failed update cart:", err);
      }
    } else {
      const updated = cart.map((it) =>
        it._id === itemId ? { ...it, qty: Number(newQty) } : it
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  const removeItem = async (itemId) => {
    if (user) {
      try {
        const res = await api.delete(`/cart/remove/${itemId}`);
        setCart(normalizeServerCart(res.data));
      } catch (err) {
        console.error("Failed remove item:", err);
      }
    } else {
      const updated = cart.filter((it) => it._id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
