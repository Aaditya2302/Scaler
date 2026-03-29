# 🛒 Amazon Clone (Full Stack E-Commerce Platform)

A fully functional Amazon-like e-commerce web application built using the **PERN stack (with PostgreSQL + Prisma)**. This project replicates core Amazon features such as product browsing, cart management, wishlist, and order placement with a modern UI and full backend integration.

---

## 🚀 Live Demo

* 🌐 Frontend (Vercel): https://scaler-indol.vercel.app
* 🔗 Backend (Render): https://amazon-backend-e5xy.onrender.com

---

## 📌 Features

### 🛍️ User Features

* Browse products dynamically from database
* View product details
* Add/remove items from cart
* Add/remove items from wishlist
* Place orders with shipping details
* View order history

### ⚡ System Features

* Fully responsive Amazon-like UI
* Dynamic routing for products
* Backend API integration
* Persistent data storage (PostgreSQL)
* Optimistic UI updates for better UX

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Context API (Cart, Wishlist, Orders, User)

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL (Neon - Cloud)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
amazon-clone/
│
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── assets/
│
├── server/                 # Backend (Node + Express)
│   ├── prisma/
│   │   └── schema.prisma
│   ├── routes/
│   ├── utils/
│   └── index.js
```

---

## ⚙️ Environment Variables

### 🔹 Frontend (`client/.env`)

```
VITE_API_URL=https://amazon-backend-e5xy.onrender.com
```

---

### 🔹 Backend (`server/.env`)

```
DATABASE_URL=your_neon_database_url
FRONTEND_URL=https://scaler-indol.vercel.app
PORT=5000
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run seed
node index.js
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/products     | Get all products  |
| GET    | /api/products/:id | Get product by ID |
| POST   | /api/cart         | Add to cart       |
| GET    | /api/cart         | Get cart items    |
| POST   | /api/orders       | Create order      |
| GET    | /api/orders       | Get order history |
| POST   | /api/wishlist     | Add to wishlist   |

---

## 🔥 Key Highlights

* 🔗 Full frontend-backend integration
* ☁️ Cloud database (Neon PostgreSQL)
* ⚡ Fast and optimized UI (Vite + Tailwind)
* 🔐 Structured backend with Prisma ORM
* 🌍 Fully deployed and production-ready

---

## 🚧 Future Improvements

* User authentication (JWT)
* Payment gateway integration (Razorpay/Stripe)
* Admin dashboard
* Product reviews & ratings
* Search & filter optimization

---

## 🙌 Acknowledgements

Inspired by the design and functionality of Amazon.

---

## 📧 Contact

**Aaditya Aggarwal**

* GitHub: https://github.com/Aaditya2302
* LinkedIn: https://linkedin.com/in/aaditya-aggarwal-r4p

---
