export interface Photo {
    id: number;
    src: string;
    sol: number;
    cameraName: string;
    roverName: string;
}

export interface SolPage {
    sol: number;
    rover: Rover;
}

export interface Sol extends SolPage {
    photoIds: number[];
}

export enum Rover {
    Perseverance = "Perseverance",
    Curiosity = "Curiosity",
    Opportunity = "Opportunity",
    Spirit = "Spirit",
}

export enum Status {
    Idle = "idle",
    Loading = "loading",
    Failed = "failed",
    Loaded = "loaded",
}

export enum Route {
    Nasa = "nasa",
    Favourite = "favourite",
    Stats = "stats",
}