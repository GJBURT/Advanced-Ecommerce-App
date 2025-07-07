
# 🛒 Advanced E-Commerce App

**Advanced E-Commerce App** is built with React, TypeScript, Redux Toolkit, and React Query. The project leverages the [FakeStoreAPI](https://fakestoreapi.com/) to simulate asynchronous data fetching and category-based product filtering.

![Project Preview](./A_2D_digital_graphic_design_showcases_an_"Advanced.png)

## 🚀 Features

- 🔐 Dynamic product catalog with title, price, category, rating, and images
- 📂 Category filter with dropdown populated from API
- 🛍️ Shopping cart with item quantity, removal, and total price calculation
- 🔁 Cart state persisted via `sessionStorage`
- ✅ Simulated checkout functionality with confirmation and reset
- 🧠 Global state management with Redux Toolkit
- 🌐 Asynchronous data fetching with React Query
- 📱 Responsive design for all screen sizes

## 🧰 Technologies Used

- React
- TypeScript
- Redux Toolkit
- React Query
- FakeStoreAPI
- CSS (custom)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GJBURT/Advanced-Ecommerce-App.git
cd Advanced-Ecommerce-App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components (Home, Cart, etc.)
├── features/cart/   # Redux slice for cart functionality
├── redux/           # Store setup
├── App.tsx          # Main app component
└── main.tsx         # App root and provider setup
```

## 📝 Design Notes

- 🧭 The cart button remains accessible at the top of the catalog.
- ↩️ A “Continue Shopping” link allows smooth navigation back to the catalog from the cart.
- ✅ All functionality has been tested for persistence, error handling, and responsiveness.

---

> Built by [Geoffrey Burt](https://github.com/GJBURT)
