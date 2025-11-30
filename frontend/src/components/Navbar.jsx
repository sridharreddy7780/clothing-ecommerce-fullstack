import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "15px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>Home</Link>
      <Link to="/products" style={{ color: "#fff", marginRight: "20px" }}>Products</Link>
      <Link to="/cart" style={{ color: "#fff", marginRight: "20px" }}>Cart</Link>

      {user ? (
        <>
          <span style={{ marginRight: "15px" }}>Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
