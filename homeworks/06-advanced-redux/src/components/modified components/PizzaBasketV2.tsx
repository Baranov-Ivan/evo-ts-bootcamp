import { Pizza, RootState} from "../../types";
import { useSelector } from "react-redux";
import { PizzaBasketItemV2 } from "./PizzaBasketItemV2";
import { Missing } from "../Missing";

export const selectPizzaInBasket = (
  state: RootState
): Array<Pizza & { count: number }> => {
  return state.basket.pizzas.map(({ _id, count }) => {
    const pizza = state.pizza.find((p) => p._id === _id)!;
    return { ...pizza, count, price: count * pizza.price };
  });
};

export function PizzaBasketV2() {
  const pizzas = useSelector(selectPizzaInBasket);

  if (pizzas.length > 0) {
    return (
      <>
        {pizzas.map((item: Pizza & { count: number }) => (
          <PizzaBasketItemV2
            _id={item._id}
            key={item._id}
            price={item.price}
            name={item.name}
            count={item.count}
          />
        ))}
      </>
    );
  } else {
    return <Missing />;
  }
}
