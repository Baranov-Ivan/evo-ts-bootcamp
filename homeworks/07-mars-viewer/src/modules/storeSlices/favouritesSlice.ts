import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface favouritesState {
  favouritePhotos: Record<number, boolean>;
}

const initialState: favouritesState = {
  favouritePhotos: {},
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    favouriteStatusChange: (
      state: favouritesState,
      action: PayloadAction<number>
    ) => {
      if (state.favouritePhotos[action.payload]) {
        state.favouritePhotos[action.payload] = false;
      } else {
        state.favouritePhotos[action.payload] = true;
      }
    },
  },
});

export const { favouriteStatusChange } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
