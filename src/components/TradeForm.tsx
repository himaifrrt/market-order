import React, { useEffect } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/StoreContext';
import {Order} from '../stores/OrderStore'
const TradeForm = observer(() => {
  const { tradeStore, orderStore } = useStore();

  // Обработчик для основного поля ввода
  const handlePrimaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    if (tradeStore.isTokenInput) {
      tradeStore.setTokenAmount(value); // Если токены основное поле
    } else {
      tradeStore.setUsdAmount(value); // Если USD основное поле
    }
  };

  // Переключение между режимами
  const handleSwitch = () => {
    tradeStore.toggleInputMode();
  };

  // Функция создания ордера, ошибки не обрабатываются так как нет условия в тз
  const handleCreateOrder = async () => {
    const orderData = {
      amountTokens: tradeStore.tokenAmount,
      amountDollars: tradeStore.usdAmount,
    };
    const newOrder: Order = {
      id: 'null',
      amountTokens: tradeStore.tokenAmount,
      amountDollars: tradeStore.usdAmount,
      status: 'Pending',
      createdAt: moment().format('DD-MM-YYYY'),
    };
    orderStore.addOrder(newOrder);

    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      console.log('Order created', orderData);
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // Обновление курса токена при изменении
  useEffect(() => {
    tradeStore.startListeningForTokenRate();

    return () => {
      tradeStore.stopListeningForTokenRate();
    };
  }, [tradeStore]);
  
  return (
    <div className="container mt-4 mb-4">
      <div className="card p-4">
        <h3>Create Order</h3>

        <div className="mb-3">
          <p>Current Token to USD Rate: {tradeStore.rate} USD</p>
        </div>

        <div className='inpun-wrapper d-flex justify-content-between'>
          <div className="mb-3">
            <label className="form-label">Amount in Tokens</label>
            <input
              type="number"
              className="form-control"
              placeholder='0'
              value={tradeStore.tokenAmount || ''}
              onChange={handlePrimaryInputChange}
              disabled={!tradeStore.isTokenInput}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="switchInput"
              onChange={handleSwitch}
              checked={!tradeStore.isTokenInput}
            />
            <label className="form-check-label" htmlFor="switchInput">
              Switch to {tradeStore.isTokenInput ? 'USD' : 'Tokens'}
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Amount in USD</label>
            <input
              type="number"
              className="form-control"
              placeholder='0'
              value={tradeStore.usdAmount}
              onChange={handlePrimaryInputChange}
              disabled={tradeStore.isTokenInput}
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleCreateOrder}>
          Create Order
        </button>
      </div>
    </div>
  );
});

export default TradeForm;
