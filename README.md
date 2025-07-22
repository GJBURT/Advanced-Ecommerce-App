# 🛒 Advanced E-Commerce App

**Advanced E-Commerce App** is a full-featured e-commerce platform built with **React**, **TypeScript**, **Firebase (Auth + Firestore)**, and **Redux Toolkit**. It allows customers to browse products, manage carts, place orders, and view their order history. Admins can manage the product catalog and track all customer orders. Authentication, order persistence, and profile management are handled via Firebase.

🔗 **Live Demo:** [https://advanced-ecommerce-app.vercel.app/login](https://advanced-ecommerce-app.vercel.app/login)

---

## 🚀 Features

- 🔐 **Authentication** – Register, Login, Logout with Firebase Auth
- 👤 **User Profile** – View and update name and address
- ❌ **Account Deletion** – Cascading deletion of user data and orders
- 🛍️ **Product Catalog** – Fetched from Firestore
- 🛠️ **Admin Panel** – Add, edit, and delete products
- 📦 **Order Management**  
  - Place orders and view customer order history  
  - Admins can view all orders with customer details
- 🧠 **State Management** – Redux Toolkit
- 📡 **Realtime Updates** – Firestore listener integration
- 🖼️ **Responsive Design** – Mobile-optimized layout and components
- 🔔 **Toast Notifications** – Feedback on successful actions (e.g., order placement)

---

## ✅ Test-Driven Development & CI/CD

- 🧪 **Unit Tests**  
  - Components tested for rendering, props, and interaction
  - Focused tests on cart and toast logic
- 🔗 **Integration Tests**  
  - Ensures order flows and cart behavior work as expected
- ⚙️ **CI/CD Pipeline**  
  - GitHub Actions: Install → Build → Test → Deploy  
  - Connected with Vercel for automatic production deployment

---

## 🧰 Tech Stack

- React + TypeScript
- Redux Toolkit
- Firebase Auth + Firestore
- React Router
- Vite
- CSS Modules + Global Styles

---

## 📁 Project Structure

```
src/
├── components/       # Shared UI (Header, CartItem, Toast, etc.)
├── pages/            # Views (Login, Register, Profile, Orders, Admin)
├── context/          # Auth and user context
├── redux/            # Cart and user state slices
├── firebase/         # Firebase config
├── App.tsx           # Main layout and routes
└── main.tsx          # Entry point
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GJBURT/Advanced-Ecommerce-App.git
cd Advanced-Ecommerce-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project, enable **Email/Password Authentication** and **Cloud Firestore**
- Create a `.env` file in the root and add:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the development server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔭 Future Enhancements

- 🔎 Product search + category filtering
- 📈 Admin dashboard with analytics
- ✉️ Email receipts and confirmations
- 💰 Coupons and promotional logic
- 🛒 Save cart across sessions

---

> Developed by [Geoffrey Burt](https://github.com/GJBURT)