import {AsyncThunk, createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {fetchPhotos} from "../marsViewerAPI";
import {Photo, Rover, Sol, SolPage, Status} from "../types";

export interface MarsViewerState {
  status: Status;
  photos: Record<number, Photo>;
  selectedSol: number;
  selectedRover: Rover;
  sols: Record<string, Sol>;
}

export const getSolRoverKey = (solPage: SolPage): string =>
  solPage.rover + solPage.sol;

const initialState: MarsViewerState = {
  status: Status.Idle,
  photos: {},
  selectedSol: 1,
  selectedRover: Rover.Perseverance,
  sols: {},
};

export const loadPhotos: AsyncThunk<Photo[], SolPage, {}> = createAsyncThunk(
  "marsViewer/loadPhotos",
  async (solPage: SolPage) => {
    debugger;
    const photos = await fetchPhotos(solPage);
    return photos;
  },
  {
    condition: (solPage: SolPage, { getState }) => {
      debugger;
      const state= getState() as RootState;
      const key = getSolRoverKey(solPage);
      if (state.mars.sols[key]) {
        return false;
      }
    },
  }
);

export const marsSlice = createSlice({
  name: "marsViewer",
  initialState,
  reducers: {
    solChange: (state, action: PayloadAction<number>) => {
      state.selectedSol = action.payload;
    },
    roverChange: (state, action: PayloadAction<Rover>) => {
      state.selectedRover = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPhotos.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(loadPhotos.fulfilled, (state, action) => {
        const solPage = action.meta.arg;
        const photos = action.payload;

        state.status = Status.Loaded;
        photos.forEach((photo) => {
          state.photos[photo.id] = photo;
        });

        const solRoverKey = getSolRoverKey(solPage);
        state.sols[solRoverKey] = {
          photoIds: photos.map((photo) => photo.id),
          sol: solPage.sol,
          rover: solPage.rover,
        };
      })
      .addCase(loadPhotos.rejected, (state, action) => {
        state.status = Status.Failed;
      });
  },
});

export const { solChange, roverChange, setStatus } = marsSlice.actions;

export default marsSlice.reducer;
