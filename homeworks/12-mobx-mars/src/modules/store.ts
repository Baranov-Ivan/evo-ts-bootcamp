import {Mars} from "./storeSlices/marsSlice";
import {Routes} from "./storeSlices/routesSlice";
import {createContext} from "./storeUtils";
import {Favourites} from "./storeSlices/favouritesSlice";


const mars = new Mars();

export const { StoreProvider, useStore } = createContext({
    Mars: mars,
    Favourites: new Favourites(mars),
    Routes: new Routes()
});