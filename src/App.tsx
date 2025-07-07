import React from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';

const App: React.FC = () => {
  return (
    <div style={{ padding: '2rem'}}>
      <Home />
      <hr />
      <Cart />
    </div>
  );
};

export default App;
