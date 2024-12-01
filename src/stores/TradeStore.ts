import { makeAutoObservable } from "mobx";

import { subscribeToTokenRate, unsubscribeFromTokenRate } from "../utils/socket";

export class TradeStore {
  tokenAmount: number = 0;
  usdAmount: number = 0;
  rate: number = 1;
  isTokenInput: boolean = true;

  constructor() {
    // Делаем свойства наблюдаемыми
    makeAutoObservable(this);
    this.startListeningForTokenRate();
  }

  setRate(rate: number) {
    this.rate = rate;
    this.updateSecondaryField();
  }

  updateAmounts() {
    // Если есть значение долларов - пересчитываем сумму в токенах
    if (this.usdAmount && !this.tokenAmount) {
      this.tokenAmount = this.usdAmount / this.rate;
    // Иначе пересчитываем сумму в USD
    } else {
      this.usdAmount = this.tokenAmount * this.rate;
    }
  }

  // Обновляем значение токенов
  setTokenAmount(amount: number) {
    this.tokenAmount = amount;
    this.usdAmount = amount * this.rate; // Пересчитываем USD
  }

  // Обновляем значение долларов
  setUsdAmount(amount: number) {
    this.usdAmount = amount;
    this.tokenAmount = amount / this.rate; // Пересчитываем токены
  }

  // Логика пересчета вторичного поля
  updateSecondaryField() {
    if (this.isTokenInput) {
      this.usdAmount = this.tokenAmount * this.rate;
    } else {
      this.tokenAmount = this.usdAmount / this.rate;
    }
  }

  // Переключение между токенами и USD
  toggleInputMode() {
    this.isTokenInput = !this.isTokenInput;

    // При переключении значения должны быть перенесены между полями
    if (this.isTokenInput) {
      this.tokenAmount = this.usdAmount / this.rate; // Конвертируем USD в токены
    } else {
      this.usdAmount = this.tokenAmount * this.rate; // Конвертируем токены в USD
    }
}

  // Обработка событий WebSocket
  startListeningForTokenRate() {
    subscribeToTokenRate(this.setRate.bind(this));
  }

  stopListeningForTokenRate() {
    unsubscribeFromTokenRate();
  }
}
