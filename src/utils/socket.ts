import { io } from "socket.io-client";

// Подключение к серверу
const socket = io("http://localhost:3000");

export const subscribeToTokenRate = (callback: (rate: number) => void) => {
  socket.on("tokenRate", (rate: number) => {
    callback(rate); // Сохраняем в стор полученный курс токена
  });
};

export const unsubscribeFromTokenRate = () => {
  socket.off("tokenRate"); // Отписываемся от события
};

// Подписка на события ордеров
export const subscribeToOrderList = (callback: (orders: any[]) => void) => {
    socket.on("orderList", (orders: any[]) => {
      callback(orders); // Сохраняем в стор полученный список ордеров
    });
};

export const unsubscribeFromOrderList = () => {
    socket.off("orderList"); // Отписываемся от события
};
  
export const subscribeToOrderUpdates = (callback: (order: any) => void) => {
    socket.on("orderUpdated", (order: any) => {
        callback(order); // Сохраняем в стор обновлённый ордер
    });
};

export const unsubscribeFromOrderUpdated = () => {
    socket.off("orderUpdated"); // Отписываемся от события
};

export const subscribeToNewOrder = (callback: (order: any) => void) => {
    socket.on("newOrder", (order: any) => {
        callback(order); // Сохраняем в стор новый ордер
    });
};

export const unsubscribeToNewOrder = () => {
    socket.off("newOrder"); // Отписываемся от события
};
