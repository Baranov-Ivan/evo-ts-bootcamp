import React from "react";
import { Pizza, RootState } from "../../types";
import { useSelector} from "react-redux";
import { PizzaItemV2 } from "./PizzaItemV2";
import { Loading } from "../Loading";

export const selectPizzas = (state: RootState) => {
  return state.pizza;
};

export function PizzaListV2() {
  const pizzas = useSelector(selectPizzas);

  if (pizzas.length > 0) {
    return (
      <>
        {pizzas.map((item: Pizza) => (
          <PizzaItemV2
            key={item._id}
            _id={item._id}
            name={item.name}
            price={item.price}
          />
        ))}
      </>
    );
  } else {
    return <Loading />;
  }
}
