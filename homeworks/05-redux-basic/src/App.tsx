import React from 'react';
import './App.css';
import {createStore, AnyAction, compose} from "redux";
import {useSelector} from "react-redux";
import {transactions} from "./transactions";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(transactions, undefined, composeEnhancers());


function App() {
  const balance = useSelector(store => store);
  return (
          <div className="App">
            <h1>Balance: {balance}</h1>
            <button onClick = {() => store.dispatch({type: 'UPDATE_BALANCE', payload: 1000})}>Set balance to 1000</button>
            <button onClick = {() => store.dispatch({type: 'CREDIT', payload: 100})}>Credit 100</button>
            <button onClick = {() => store.dispatch({type: 'SET_BALANCE_WITH_TAX', payload: 13})}>Get balance with tax</button>
            <button onClick = {() => store.dispatch({type: 'DEBIT', payload: 100})}>Debit 100</button>
          </div>
  );
}


export default App;
