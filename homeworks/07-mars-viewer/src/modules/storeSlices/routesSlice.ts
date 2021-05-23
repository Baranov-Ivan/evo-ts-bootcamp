import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Route} from "../types";

export interface RoutesState {
  selectedRoute: Route;
}

const initialState: RoutesState = {
  selectedRoute: Route.Nasa,
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    routeChange: (state, action: PayloadAction<Route>) => {
      state.selectedRoute = action.payload;
    },
  },
});

export const { routeChange } = routeSlice.actions;

export default routeSlice.reducer;
