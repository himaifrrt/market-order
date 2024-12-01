import React from 'react';

import OrderForm from './components/TradeForm';
import OrdersList from './components/OrdersList';

// Т.к. у нас всего одна страница роутинг не применялся
const App = () => {
    return (
      <div className="container">
        <OrderForm />
        <OrdersList />
      </div>
    );
};

export default App;
