import { AnyAction } from "redux";
import { Pizza, PizzaActions } from "../../types";

export function pizzaListReducer(
  state: Pizza[] = [],
  action: AnyAction
): Pizza[] {
  const { type, payload } = action;
  switch (type) {
    case PizzaActions.PIZZA_VIEWED:
      return payload;
    default:
      return state;
  }
}
