import React from "react";
import { PizzaPrice } from "../PizzaPrice";
import { RootState } from "../../types";
import { useSelector } from "react-redux";

export const selectTotalPrice = (state: RootState): number => {
  return state.basket.pizzas.reduce((sum, { _id, count }) => {
    const pizza = state.pizza.find((p) => p._id === _id)!;
    return sum + pizza.price * count;
  }, 0);
};

export function TotalPriceV2() {
  const price = useSelector(selectTotalPrice);

  return (
    <div className="flex">
      <span>Total price:</span>
      <PizzaPrice price={price} />
    </div>
  );
}
