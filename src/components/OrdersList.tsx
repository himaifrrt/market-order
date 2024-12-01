import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { useStore } from '../stores/StoreContext';

const tableHeaders = ['Amount Tokens', 'Amount Dollars', 'Status', 'Created At']

const OrdersList = observer(() => {
    const { orderStore } = useStore();

  // Прослушивание событий для списка ордеров
  useEffect(() => {
    orderStore.listenForOrderEvents();

    return () => {
        orderStore.stopListeningForTokenRate();
    }
  }, [orderStore]);

  // изменяем цвет текста cтатуса
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-primary"; // Синий
      case "Processing":
        return "text-warning"; // Желтый
      case "Completed":
        return "text-success"; // Зеленый
      default:
        return "";
    }
  };

  return (
    <div className="table-responsive container">
      {orderStore.orders.length ? (
        <table className="table table-bordered table-hover rounded table-striped">
            <thead className="thead-dark">
            <tr>
                {tableHeaders.map(header => <th className='text-center'>{header}</th>)}
            </tr>
            </thead>
            <tbody>
            {orderStore.orders.map((row) => (
                <tr key={row.id}>
                <td className='text-end'>{row.amountTokens.toFixed(4)}</td>
                <td className='text-end'>{row.amountDollars.toFixed(2)}</td>
                <td className={'text-center ' + getStatusClass(row.status)}>{row.status}</td>
                <td className='text-center'>{moment(row.createdAt).format('DD-MM-YYYY')}</td>
                </tr>
            ))}
            </tbody>
        </table>
      ): null}
    </div>
  );
});

export default OrdersList;
