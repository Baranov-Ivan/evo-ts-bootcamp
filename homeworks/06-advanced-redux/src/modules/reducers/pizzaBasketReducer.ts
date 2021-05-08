import { AnyAction } from "redux";
import { PizzaActions, PizzaInBasket } from "../../types";

export function pizzaBucketReducer(
  state: { pizzas: Array<PizzaInBasket> } = { pizzas: [] },
  action: AnyAction
): { pizzas: Array<PizzaInBasket> } {
  const { type, payload } = action;

  const updPizzas = [...state.pizzas];
  switch (type) {
    case PizzaActions.PIZZA_ADDED_INTO_BASKET: {
      const currentPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza._id === payload._id
      );
      if (currentPizzaIndex >= 0) {
        updPizzas[currentPizzaIndex].count++;
        return { ...state, pizzas: updPizzas };
      } else {
        const newPizza: PizzaInBasket = {
          _id: payload._id,
          count: 1,
        };
        return { ...state, pizzas: [...state.pizzas, newPizza] };
      }
    }

    case PizzaActions.PIZZA_REMOVED_FROM_BASKET: {
      const currentPizzaIndex = state.pizzas.findIndex(
        (pizza) => pizza._id === payload
      );
      if (updPizzas[currentPizzaIndex].count > 1) {
        updPizzas[currentPizzaIndex].count--;
        return { ...state, pizzas: updPizzas };
      } else {
        updPizzas.splice(currentPizzaIndex, 1);
        return { ...state, pizzas: updPizzas };
      }
    }
    default:
      return state;
  }
}
