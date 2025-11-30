// backend/seedProducts.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Classic White T-Shirt", description: "Soft cotton tee", price: 499, image: "https://picsum.photos/seed/tee1/400/400", category: "Men", sizes: ["S","M","L","XL"], stock: 50 },
  { name: "Denim Jacket", description: "Blue denim jacket", price: 2499, image: "https://picsum.photos/seed/jacket1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 20 },
  { name: "Slim Fit Jeans", description: "Comfort stretch jeans", price: 1599, image: "https://picsum.photos/seed/jeans1/400/400", category: "Men", sizes: ["S","M","L","XL"], stock: 40 },
  { name: "Black Hoodie", description: "Cozy pullover hoodie", price: 799, image: "https://picsum.photos/seed/hoodie1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 30 },
  { name: "Floral Dress", description: "Summer floral dress", price: 1299, image: "https://picsum.photos/seed/dress1/400/400", category: "Women", sizes: ["S","M","L"], stock: 25 },
  { name: "Maxi Skirt", description: "Lightweight maxi", price: 899, image: "https://picsum.photos/seed/skirt1/400/400", category: "Women", sizes: ["S","M","L"], stock: 20 },
  { name: "Women's Denim Jacket", description: "Stylish denim", price: 2299, image: "https://picsum.photos/seed/jacket2/400/400", category: "Women", sizes: ["S","M","L"], stock: 15 },
  { name: "Crop Top", description: "Casual crop top", price: 599, image: "https://picsum.photos/seed/top1/400/400", category: "Women", sizes: ["S","M"], stock: 35 },
  { name: "Kids Cartoon T-Shirt", description: "Fun graphic tee", price: 399, image: "https://picsum.photos/seed/kidtee1/400/400", category: "Kids", sizes: ["S","M"], stock: 60 },
  { name: "Kids Hoodie", description: "Warm and soft", price: 699, image: "https://picsum.photos/seed/kidhoodie1/400/400", category: "Kids", sizes: ["S","M","L"], stock: 40 },
  { name: "Men's Formal Shirt", description: "Office wear shirt", price: 1199, image: "https://picsum.photos/seed/shirt1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 30 },
  { name: "Women's Blouse", description: "Elegant blouse", price: 999, image: "https://picsum.photos/seed/blouse1/400/400", category: "Women", sizes: ["S","M","L"], stock: 22 },
  { name: "Running Shorts", description: "Lightweight shorts", price: 499, image: "https://picsum.photos/seed/shorts1/400/400", category: "Men", sizes: ["S","M","L"], stock: 45 },
  { name: "Athleisure Leggings", description: "Stretchable leggings", price: 899, image: "https://picsum.photos/seed/legging1/400/400", category: "Women", sizes: ["S","M","L"], stock: 50 },
  { name: "Kids Jeans", description: "Durable denim", price: 799, image: "https://picsum.photos/seed/kidjeans1/400/400", category: "Kids", sizes: ["S","M","L"], stock: 30 },
  { name: "Puffer Jacket", description: "Warm winter jacket", price: 3499, image: "https://picsum.photos/seed/puffer1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 10 },
  { name: "Trench Coat", description: "Classic coat", price: 3999, image: "https://picsum.photos/seed/coat1/400/400", category: "Women", sizes: ["M","L"], stock: 8 },
  { name: "Casual Polo", description: "Smart casual polo", price: 699, image: "https://picsum.photos/seed/polo1/400/400", category: "Men", sizes: ["S","M","L","XL"], stock: 55 },
  { name: "Graphic Sweatshirt", description: "Printed sweatshirt", price: 799, image: "https://picsum.photos/seed/sweat1/400/400", category: "Women", sizes: ["M","L"], stock: 28 },
  { name: "Kids Jacket", description: "Light kids' jacket", price: 999, image: "https://picsum.photos/seed/kidjacket1/400/400", category: "Kids", sizes: ["S","M"], stock: 25 },
    { name: "Men's Leather Jacket", description: "Premium brown leather jacket", price: 4999, image: "https://picsum.photos/seed/leatherj1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 10 },
  { name: "Men's Kurta", description: "Traditional festive kurta", price: 1299, image: "https://picsum.photos/seed/kurta1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 20 },
  { name: "Men's Track Pants", description: "Comfortable daily wear track pants", price: 749, image: "https://picsum.photos/seed/track1/400/400", category: "Men", sizes: ["S","M","L","XL"], stock: 35 },
  { name: "Women's Party Gown", description: "Elegant red party gown", price: 2599, image: "https://picsum.photos/seed/gown1/400/400", category: "Women", sizes: ["S","M","L"], stock: 12 },
  { name: "Women's Winter Sweater", description: "Soft knitted winter sweater", price: 1199, image: "https://picsum.photos/seed/sweater2/400/400", category: "Women", sizes: ["S","M","L"], stock: 18 },
  { name: "Women's Joggers", description: "Comfort-fit joggers for daily wear", price: 899, image: "https://picsum.photos/seed/joggers1/400/400", category: "Women", sizes: ["S","M","L"], stock: 30 },
  { name: "Women's Scarf", description: "Lightweight floral scarf", price: 349, image: "httpsum.photos/seed/scarf1/400/400", category: "Women", sizes: ["Free"], stock: 50 },
  { name: "Kids Party Dress", description: "Beautiful kids festive dress", price: 999, image: "https://picsum.photos/seed/kiddress1/400/400", category: "Kids", sizes: ["S","M","L"], stock: 22 },
  { name: "Kids Track Set", description: "Matching hoodie + jogger set", price: 899, image: "https://picsum.photos/seed/kidset1/400/400", category: "Kids", sizes: ["S","M","L"], stock: 25 },
  { name: "Kids Raincoat", description: "Waterproof raincoat for kids", price: 799, image: "https://picsum.photos/seed/raincoat1/400/400", category: "Kids", sizes: ["S","M"], stock: 20 },

  { name: "Men's Boots", description: "Rugged leather boots", price: 2799, image: "https://picsum.photos/seed/bootsm1/400/400", category: "Men", sizes: ["M","L","XL"], stock: 14 },
  { name: "Women's Sneakers", description: "Stylish white sneakers", price: 1499, image: "https://picsum.photos/seed/sneakerw1/400/400", category: "Women", sizes: ["S","M","L"], stock: 28 },
  { name: "Kids Sandals", description: "Comfort sandals for kids", price: 499, image: "https://picsum.photos/seed/sandalk1/400/400", category: "Kids", sizes: ["S","M"], stock: 40 },
  { name: "Women's Handbag", description: "Premium leather handbag", price: 1899, image: "https://picsum.photos/seed/handbagw1/400/400", category: "Women", sizes: ["Free"], stock: 15 },
  { name: "Men's Cap", description: "Stylish winter cap", price: 299, image: "https://picsum.photos/seed/capm1/400/400", category: "Men", sizes: ["Free"], stock: 55 }

];

const run = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/clothing-ecommerce';
    await mongoose.connect(uri); // no options
    console.log('Connected to MongoDB for seeding');

    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Inserted ${created.length} products`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

run();
