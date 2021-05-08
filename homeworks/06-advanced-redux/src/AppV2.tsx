import React, { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getPizzaThunk } from "./modules/middlewares/getPizzaThunk";
import { PizzaListV2 } from "./components/modified components/PizzaListV2";
import { PizzaBasketV2 } from "./components/modified components/PizzaBasketV2";
import { TotalPriceV2 } from "./components/modified components/TotalPriceV2";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPizzaThunk());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          <PizzaListV2 />
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPriceV2 />
          <PizzaBasketV2 />
          <div className="flex flex-col">
            <button className="bg-yellow-400 rounded-xl pt-2 pb-2">
              Make Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
