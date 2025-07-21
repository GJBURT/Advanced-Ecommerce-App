# 🛒 Advanced E-Commerce App

**Advanced E-Commerce App** is a full-featured e-commerce platform built with **React**, **TypeScript**, **Firebase (Auth + Firestore)**, and **Redux Toolkit**. It allows customers to browse products, manage their carts, place orders, and view order history. Admins can manage product inventory and view all customer orders. Authentication, order persistence, and user profile management are handled via Firebase services.

🔗 **Live Demo:** [https://advanced-ecommerce-app.vercel.app/login](https://advanced-ecommerce-app.vercel.app/login)

## 🚀 Features

- 🔐 **User Authentication** (Register, Login, Logout) with Firebase Auth
- 👤 **User Profile** view and update (name + address support)
- ❌ **Account Deletion** with cascading order deletion
- 🛍️ **Product Catalog** fetched from Firestore
- 🛠️ **Admin Panel** to add, update, and delete products
- 📦 **Order Management**:
  - Place orders with cart contents
  - View order history (Customer)
  - View all orders with customer details (Admin)
- 🧠 **Global State** with Redux Toolkit
- ⚡ **Realtime Firestore Queries**
- 🖥️ **Responsive UI** (mobile-friendly)

## ✅ Test-Driven Development & CI/CD

- 🧪 **Unit Testing**: 
  - 2+ focused unit tests written for components
  - Tested rendering, interaction, and prop/state behavior
- 🔗 **Integration Testing**:
  - Validated cart updates on product addition
  - Used React Testing Library for DOM simulation & assertions
- ⚙️ **CI/CD with GitHub Actions**:
  - Automatic workflow triggers on `main` branch push
  - Workflow includes: Install → Build → Test
  - If all tests pass, app deploys via Vercel
- 🚀 **Continuous Deployment**:
  - Connected to Vercel for seamless live updates after CI success

✅ **Front End Specialization Project Requirement Completed**

## 🧰 Tech Stack

- React + TypeScript
- Firebase Authentication
- Cloud Firestore (NoSQL DB)
- Redux Toolkit
- React Router
- Vite
- CSS Modules / Custom Styling

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components (Header, CartItem, etc.)
├── pages/            # Views: Home, Login, Register, Profile, MyOrders, AdminOrders
├── context/          # Auth and User context
├── firebase/         # Firebase config and initialization
├── redux/            # Redux slices (cart, user)
├── App.tsx           # Routing and layout
└── main.tsx          # App entry point
```

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/GJBURT/Advanced-Ecommerce-App.git
cd Advanced-Ecommerce-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a Firebase project
- Enable **Email/Password Auth** and **Firestore**
- Add a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the dev server

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## 📌 Future Improvements

- 🔍 Product search and filtering
- 📊 Admin analytics dashboard
- ✉️ Email confirmation receipts
- 🛒 Enhanced cart UX (saved carts, coupons)

---

> Built by [Geoffrey Burt](https://github.com/GJBURT)