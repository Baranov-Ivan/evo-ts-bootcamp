import { createStore, combineReducers, applyMiddleware} from "redux";
import { pizzaListReducer } from "./reducers/pizzaListReducer";
import { pizzaBucketReducer } from "./reducers/pizzaBasketReducer";
import thunk from "redux-thunk";
import { createLogToServer } from "./middlewares/logToServer";
import {PizzaActions, PizzaEvent, State} from "../types";

export const reducer = combineReducers({
  pizza: pizzaListReducer,
  basket: pizzaBucketReducer,
});
export const store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    createLogToServer<State>({
      [PizzaActions.PIZZA_VIEWED]: (action, state):PizzaEvent => ({
        eventName: action.type,
      }),
      [PizzaActions.PIZZA_ADDED_INTO_BASKET]: (action, state: State):PizzaEvent => ({
        eventName: action.type,
        pizzaName: state.pizza.find((p) => p._id === action.payload._id)?.name,
        pizzaPrice: state.pizza.find((p) => p._id === action.payload._id)?.price,
      }),
      [PizzaActions.PIZZA_REMOVED_FROM_BASKET]: (action, state: State):PizzaEvent => ({
        eventName: action.type,
        pizzaName: state.pizza.find((p) => p._id === action.payload)?.name,
        pizzaPrice: state.pizza.find((p) => p._id === action.payload)?.price,
      }),
    })
  )
);
