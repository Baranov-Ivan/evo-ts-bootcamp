import {Photo, Rover, Sol, SolPage, Status} from "../types";
import {action, flow, makeAutoObservable} from "mobx";

export class Mars {
    status: Status = Status.Idle;
    photos: Record<number, Photo> = {};
    selectedSol: number = 1;
    selectedRover: Rover = Rover.Perseverance;
    sols: Record<string, Sol> = {};

    constructor() {
        makeAutoObservable(this, {
            solChange: action.bound,
            roverChange: action.bound,
            setStatus: action.bound,
            loadPhotos: flow.bound,
        });
    }

    solChange(sol: number): void {
        this.selectedSol = sol;
    }

    roverChange(rover: Rover): void {
        this.selectedRover = rover;
    }

    setStatus(status: Status): void {
        this.status = status;
    }

    get selectStatus(): Status {
        if (this.status === Status.Loading) {
            return Status.Loading;
        }

        if (this.status === Status.Failed) {
            return Status.Failed;
        }

        const currentSolState = this.sols[
            this.getSolRoverKey({ sol: this.selectedSol, rover: this.selectedRover })
            ];

        if (currentSolState === undefined) {
            return Status.Idle;
        }

        return Status.Loaded;
    }

    getSolRoverKey(solPage: SolPage): string {
        return solPage.rover + solPage.sol;
    }

    get selectPhotos(): Photo[] {
        return (
            this.sols[
                this.getSolRoverKey({
                    sol: this.selectedSol,
                    rover: this.selectedRover
                })
                ]?.photoIds.map((photoId) => this.photos[photoId]) ?? []
        );
    }

    *loadPhotos(solPage: SolPage): any {
        const key = this.getSolRoverKey(solPage);
        if(this.sols[key]) {
            return;
        }

        this.status = Status.Loading;
        try {
            const response: Response= yield fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${solPage.rover.toLowerCase()}/photos?sol=${
                solPage.sol
            }&api_key=pdv3yXm5lYIHfrlkaMv25g4SSCNDujCegLcR1TuD`);
            const result = yield response.json();
            const photosArray: Photo[] = result.photos.map((photo: any): Photo => ({
                    src: photo.img_src,
                    id: photo.id,
                    sol: photo.sol,
                    cameraName: photo.camera.full_name,
                    roverName: photo.rover.name,
                })
            );

            photosArray.forEach((photo) => {
                this.photos[photo.id] = photo;
            });

            this.sols[key] = {
              photoIds: photosArray.map((photo) => photo.id),
              sol: solPage.sol,
              rover: solPage.rover,
            };

        } catch(error) {
            this.status = Status.Failed;
        } finally {
            this.status = Status.Loaded;
        }
    }
}