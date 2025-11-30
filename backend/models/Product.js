const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // image URL
  category: { type: String, enum: ['Men', 'Women', 'Kids'], required: true },
  sizes: [{ type: String, enum: ['S','M','L','XL'] }],
  stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
