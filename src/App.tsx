import React from 'react';
import { OrderBook } from './components';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <h2>Explore WSS</h2>
      <OrderBook />
    </div>
  );
};

export default App;
