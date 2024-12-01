import { makeAutoObservable } from 'mobx';
import {
  subscribeToOrderList,
  subscribeToOrderUpdates,
  subscribeToNewOrder,

  unsubscribeFromOrderList,
  unsubscribeFromOrderUpdated,
  unsubscribeToNewOrder,
} from '../utils/socket'

export interface Order {
  id: string;
  amountTokens: number;
  amountDollars: number;
  status: string;
  createdAt: string;
}

export class OrderStore {
  orders: Order[] = [];

  constructor() {
    makeAutoObservable(this);
    this.listenForOrderEvents();
  }

  // Добавить новый ордер
  addOrder(order: Order) {
    this.orders = this.orders.filter(item => item.id !== "null");
    this.orders = [order, ...this.orders];
  }

  // Обновить статус ордера
  updateOrder(order: Order) {
    this.orders = this.orders.map((o) => (o.id === order.id ? order : o));
  }

  // Обновить список ордеров (получен через WebSocket)
  setOrderList(orderList: Order[]) {
    this.orders = orderList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Обработка событий WebSocket
  listenForOrderEvents() {
    subscribeToOrderList(this.setOrderList.bind(this));
    subscribeToOrderUpdates(this.updateOrder.bind(this));
    subscribeToNewOrder(this.addOrder.bind(this));
  }

  stopListeningForTokenRate() {
    unsubscribeFromOrderList();
    unsubscribeFromOrderUpdated();
    unsubscribeToNewOrder();
  }
}
