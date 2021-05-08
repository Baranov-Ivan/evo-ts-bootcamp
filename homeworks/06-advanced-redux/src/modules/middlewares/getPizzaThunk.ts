import { ThunkAction } from "redux-thunk";
import { State, Pizza, PizzaActions } from "../../types";
import { getPizza } from "../../services/api";

export function getPizzaThunk(): ThunkAction<
  Promise<void>,
  State,
  {},
  {
    type: string;
    payload?: Pizza[];
  }
> {
  return (dispatch, getState) => {
    return new Promise<void>((res) => {
      getPizza().then((pizza) => {
        dispatch({ type: PizzaActions.PIZZA_VIEWED, payload: pizza.items });
      });
      res();
    });
  };
}
