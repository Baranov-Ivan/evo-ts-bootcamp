import {
  Action,
  configureStore,
  createSelector,
  ThunkAction,
} from "@reduxjs/toolkit";
import marsViewerReducer, {
  getSolRoverKey,



} from "./storeSlices/marsSlice";
import favouritesReducer from "./storeSlices/favouritesSlice";
import routeReducer from "./storeSlices/routesSlice";
import {Photo, Route, Rover, Sol, Status} from "./types";

export const store = configureStore({
  reducer: {
    mars: marsViewerReducer,
    favourites: favouritesReducer,
    route: routeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const selectP = (state: RootState): Record<number, Photo> => state.mars.photos;


export const selectFavouritesIds = (state: RootState): number[] =>
  Object.keys(state.favourites.favouritePhotos)
    .map((idString) => Number(idString))
    .filter((id) => state.favourites.favouritePhotos[id]);

export const selectFavourites = createSelector(
  selectP,
  selectFavouritesIds,
  (photos, favouritePhotos) => {
    return favouritePhotos?.map((photoId) => photos[photoId]) ?? [];
  }
);

export const selectSols = (state: RootState): Record<string, Sol> =>
  state.mars.sols;

export const selectCurrentSol = (state: RootState): number =>
  state.mars.selectedSol;

export const selectCurrentRover = (state: RootState): Rover =>
  state.mars.selectedRover;

export const selectCurrentTab = (state: RootState): Route =>
  state.route.selectedRoute;

export const selectPhotos = createSelector(
  selectP,
  selectSols,
  selectCurrentSol,
  selectCurrentRover,
  (photos, sols, selectedSol, selectedRover) => {
    return (
      sols[
        getSolRoverKey({ sol: selectedSol, rover: selectedRover })
      ]?.photoIds.map((photoId) => photos[photoId]) ?? []
    );
  }
);

const selectInnerStatus = (state: RootState): Status => state.mars.status;

export const selectStatus = createSelector(
  selectInnerStatus,
  selectSols,
  selectCurrentSol,
  selectCurrentRover,
  (status: Status, sols, selectedSol, selectedRover) => {
    if (status === Status.Loading) {
      return Status.Loading;
    }

    if (status === Status.Failed) {
      return Status.Failed;
    }

    const currentSolState =
      sols[getSolRoverKey({ sol: selectedSol, rover: selectedRover })];
    if (currentSolState === undefined) {
      return Status.Idle;
    }

    return Status.Loaded;
  }
);
