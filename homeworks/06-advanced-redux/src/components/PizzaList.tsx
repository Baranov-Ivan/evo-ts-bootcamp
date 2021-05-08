import React from "react";
import * as R from "ramda";
import { PizzaItem } from "./PizzaItem";

interface PizzaListProps {
  pizza: {
    _id: string;
    name: string;
    price: number;
  }[];
  onAdd: (_id: string) => void;
}

export function PizzaList({ pizza, onAdd }: PizzaListProps) {
  return R.map(
    (p) => (
      <PizzaItem
        key={p._id}
        _id={p._id}
        name={p.name}
        price={p.price}
        onAdd={onAdd}
      />
    ),
    pizza
  );
}
