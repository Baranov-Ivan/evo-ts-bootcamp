import {action, makeAutoObservable} from "mobx";
import {Mars} from "./marsSlice";
import {Photo} from "../types";

export class Favourites {
    favouritePhotos: Record<number, boolean> = {};
    mars: Mars;
    constructor(mars: Mars) {
        this.mars = mars;
        makeAutoObservable(this, {
            favouriteStatusChange: action.bound
        });
    }

    favouriteStatusChange(photoId: number): void {
        if (this.favouritePhotos[photoId]) {
            this.favouritePhotos[photoId] = false;
        } else {
            this.favouritePhotos[photoId] = true;
        }
    }
    get selectFavouritesIds(): number[] {
        return Object.keys(this.favouritePhotos).map((idString) => Number(idString)).filter((id) => this.favouritePhotos[id]);
    }
    get selectFavourites(): Photo[] {
        return this.selectFavouritesIds.map((photoId) => this.mars.photos[photoId]) ?? [];
    }
}