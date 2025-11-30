const CartItem = ({ item, updateQty, remove }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <h3>{item.name}</h3>
      <p>Size: {item.size}</p>
      <p>Price: ₹{item.price}</p>

      <input
        type="number"
        min="1"
        value={item.qty}
        onChange={(e) => updateQty(item._id, e.target.value)}
      />

      <button onClick={() => remove(item._id)}>Remove</button>
    </div>
  );
};

export default CartItem;
