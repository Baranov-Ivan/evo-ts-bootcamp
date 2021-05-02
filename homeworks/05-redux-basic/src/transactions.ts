import {AnyAction} from "redux";

export function transactions(state = 1000, action: AnyAction) {
    const type: string = action.type;
    const payload: number = action.payload;
    let newState: number;
    switch (type) {
        case "UPDATE_BALANCE":
            console.log("UPDATE_BALANCE");
            newState = payload;
            return Math.round(newState * 100) / 100;
        case "CREDIT":
            console.log("CREDIT");
            newState = state - payload;
            return Math.round(newState * 100) / 100;
        case "SET_BALANCE_WITH_TAX":
            console.log("SET_BALANCE_WITH_TAX");
            newState = state * (1 - payload / 100);
            return Math.round(newState * 100) / 100;
        case "DEBIT":
            console.log("DEBIT");
            newState = state + payload;
            return Math.round(newState * 100) / 100;
        default:
            return state;
    }
}