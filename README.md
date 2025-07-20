# 🛒 Advanced E-Commerce App

**Advanced E-Commerce App** is a full-featured e-commerce platform built with **React**, **TypeScript**, **Firebase (Auth + Firestore)**, and **Redux Toolkit**. It allows customers to browse products, manage their carts, place orders, and view order history. Admins can manage product inventory and view all customer orders. Authentication, order persistence, and user profile management are handled via Firebase services.

## 🚀 Features

- 🔐 **User Authentication** (Register, Login, Logout) with Firebase Auth
- 👤 **User Profile** view and update (with support for name and address)
- ❌ **Account Deletion** with cascading removal of orders from Firestore
- 🛍️ **Product Catalog** displayed from Firestore
- 🛠️ **Admin Features**: Add, update, and delete products
- 📦 **Order Management**:
  - Place orders with cart contents
  - View order history (Customers)
  - View all orders with customer details (Admins)
- 🧠 **Global State** using Redux Toolkit
- ⚡ **Realtime Data Fetching** with Firestore queries
- 🖥️ **Responsive UI** across all device sizes

## 🧰 Tech Stack

- React + TypeScript
- Firebase Authentication
- Cloud Firestore (NoSQL DB)
- Redux Toolkit
- React Router
- Vite
- CSS Modules / Custom Styling

## 📁 Project Structure

\`\`\`
src/
├── components/       # Reusable UI components (Header, ProductCard, etc.)
├── pages/            # Views: Home, Login, Register, Profile, MyOrders, AdminOrders
├── context/          # Auth and User context
├── firebase/         # Firebase config and initialization
├── redux/            # Slices for cart and user state
├── App.tsx           # App routing and layout
└── main.tsx          # App bootstrap
\`\`\`

## ⚙️ Getting Started

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/GJBURT/Advanced-Ecommerce-App.git
cd Advanced-Ecommerce-App
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new Firebase project
- Enable **Email/Password Authentication**
- Enable **Firestore Database**
- Create a \`.env\` file in the root with your Firebase config:

\`\`\`
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
\`\`\`

### 4. Start the app

\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:5173\` in your browser.

## ✅ To-Do / Future Features

- 🔍 Product search and filtering
- 📊 Dashboard analytics for Admin
- ✉️ Email confirmation or receipts
- 🛒 Enhanced cart UX (e.g. saved carts, coupon codes)

---

> Built by [Geoffrey Burt](https://github.com/GJBURT)
