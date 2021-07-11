import {action, makeAutoObservable} from "mobx";
import {Route} from "../types";


export class Routes {
    selectedRoute: Route = Route.Nasa;

    constructor() {
        makeAutoObservable(this, {
            routeChange: action.bound
        });
    }

    routeChange(route: Route): void {
        this.selectedRoute = route;
    }
}