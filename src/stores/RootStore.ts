import { TradeStore } from "./TradeStore";
import { OrderStore } from "./OrderStore";

class RootStore {
  tradeStore: TradeStore;
  orderStore: OrderStore;

  constructor() {
    this.tradeStore = new TradeStore();
    this.orderStore = new OrderStore();
  }
}

export const rootStore = new RootStore();
export default rootStore;
