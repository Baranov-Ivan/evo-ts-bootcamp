import { store } from "./modules/store";

export type Pizza = {
  name: string;
  price: number;
  _id: string;
};

export type PizzaInBasket = {
  _id: string;
  count: number;
};

export type State = {
  pizza: Pizza[];
  basket: { pizzas: Array<PizzaInBasket> };
};

export enum PizzaActions {
  PIZZA_VIEWED = "PIZZA_VIEWED",
  PIZZA_SELECTED = "PIZZA_SELECTED",
  PIZZA_ADDED_INTO_BASKET = "PIZZA_ADDED_INTO_BASKET",
  PIZZA_REMOVED_FROM_BASKET = "PIZZA_REMOVED_FROM_BASKET",
}

export type PizzaEvent = {
  eventName: string;
  pizzaName?: string;
  pizzaPrice?: number;
};

export type RootState = ReturnType<typeof store.getState>;
