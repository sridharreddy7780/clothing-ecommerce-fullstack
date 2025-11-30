import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // try your backend API
      const res = await fetch("http://localhost:5000/api/products");
      setRaw({ ok: res.ok, status: res.status, url: res.url });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`${res.status} ${res.statusText} — ${t}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Products fetch error:", err);
      setError(err.message);
      // fallback: try external dummyjson so UI can render
      try {
        const r2 = await fetch("https://dummyjson.com/products?limit=20");
        const d2 = await r2.json();
        setProducts(d2.products || []);
        setError(prev => prev + " — fallback to dummyjson used");
      } catch (e2) {
        console.error("Fallback fetch error:", e2);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products (debug)</h2>
      <button onClick={loadProducts}>Reload</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ marginTop: 10 }}>
        <h4>Raw request:</h4>
        <pre style={{ background: "#f5f5f5", padding: 10 }}>
          {JSON.stringify(raw, null, 2)}
        </pre>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
        {products.map((p) => (
          <ProductCard key={p._id || p.id} product={{
            _id: p._id || p.id,
            name: p.title || p.name,
            price: p.price,
            image: p.thumbnail || p.image || (p.images && p.images[0]) || "https://picsum.photos/200"
          }} />
        ))}
      </div>
    </div>
  );
}
