# Clothing E-Commerce Web App (MERN Stack)

A fully functional **Clothing Brand E-Commerce Web Application** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**.

This project was created as part of the **Pasovit Backend Developer Assignment**, implementing user authentication, product management, cart system, checkout, order placement, and email notifications.

---

## 🚀 Live Demo

> (Add your deployed URLs here after deployment)

* **Frontend:** [https://your-frontend-url](https://your-frontend-url)
* **Backend:** [https://your-backend-url](https://your-backend-url)

---

## 📦 GitHub Repository

[https://github.com/sridharreddy7780/clothing-ecommerce](https://github.com/sridharreddy7780/clothing-ecommerce)

---

## 📌 Features

### 🔐 User Authentication

* Register, Login, Logout
* JWT-based authentication
* Passwords encrypted using bcrypt
* Protected routes

### 👕 Product Management

* 35+ Clothing items
* Product listing, details
* Category, size, price filters
* Search functionality
* Pagination support

### 🛒 Shopping Cart

* Add items to cart (with size)
* Update quantity & remove items
* **Guest cart** (stored in localStorage)
* **User cart** (stored in MongoDB)
* Merge cart on login (optional)

### 💳 Checkout & Orders

* Mock checkout flow
* Store orders in MongoDB
* Includes: items, quantity, size, total price, date

### ✉ Email Notification

* Sends confirmation email using Nodemailer
* Includes: order summary, order ID, order date

---

## 🗂 Project Structure

```
clothing-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seedProducts.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
```

---

## ⚙️ Installation & Setup Guide

### 📥 Clone the repo

```sh
git clone https://github.com/sridharreddy7780/clothing-ecommerce.git
cd clothing-ecommerce
```

---

# 🛠 Backend Setup

### 1️⃣ Navigate to backend

```sh
cd backend
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Create .env file

Create a `.env` file with:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/clothing-ecommerce
JWT_SECRET=somesecretkey
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

### 4️⃣ Seed Products

```sh
node seedProducts.js
```

Expected:

```
Inserted 35 products
```

### 5️⃣ Start backend

```sh
node server.js
```

Backend runs at:

```
http://localhost:5000
```

---

# 🌐 Frontend Setup

### 1️⃣ Navigate to frontend

```sh
cd ../frontend
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Start dev server

```sh
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 API Endpoints Summary

### 🔐 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/auth/logout`
* GET `/api/auth/me`

### 👕 Products

* GET `/api/products`
* GET `/api/products/:id`

### 🛒 Cart

* GET `/api/cart`
* POST `/api/cart/add`
* PUT `/api/cart/update`
* DELETE `/api/cart/remove/:itemId`

### 🧾 Orders

* POST `/api/orders`
* GET `/api/orders/my-orders`

---

## 📧 Email Setup

Uses **Nodemailer** with Gmail / Mailtrap / SendGrid.

Enable "App Password" in Gmail if using Gmail SMTP.

---

## 📝 Todo / Future Improvements

* Add product reviews & ratings
* Add admin panel for product CRUD
* Add payment gateway (Razorpay/Stripe)
* Improve design & responsiveness

---

## 👨‍💻 Author

**Sridhar Reddy**

* GitHub: [https://github.com/sridharreddy7780](https://github.com/sridharreddy7780)
* LinkedIn: [https://www.linkedin.com/in/sridharreddykotripalli](https://www.linkedin.com/in/sridharreddykotripalli)

---

If you want to improve this README with badges, screenshots, or deployment instructions, tell me — I can upgrade it! 🚀
