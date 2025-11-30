import { useState } from "react";

const Filters = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const applyFilters = () => {
    onFilter({
      search,
      category,
      size,
      minPrice,
      maxPrice
    });
  };

  return (
    <div style={{
      padding: "15px",
      marginBottom: "20px",
      border: "1px solid #ccc"
    }}>
      <h3>Filters</h3>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginRight: 10 }}>
        <option value="All">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
      </select>

      <select value={size} onChange={(e) => setSize(e.target.value)} style={{ marginRight: 10 }}>
        <option value="">All Sizes</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ width: 100, marginRight: 10 }}
      />

      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ width: 100, marginRight: 10 }}
      />

      <button onClick={applyFilters}>Apply</button>
    </div>
  );
};

export default Filters;
