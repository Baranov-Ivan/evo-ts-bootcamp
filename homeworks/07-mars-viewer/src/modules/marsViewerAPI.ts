import {Photo, SolPage} from "./types";

export async function fetchPhotos(solPage: SolPage): Promise<Photo[]> {
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${solPage.rover.toLowerCase()}/photos?sol=${
        solPage.sol
      }&api_key=pdv3yXm5lYIHfrlkaMv25g4SSCNDujCegLcR1TuD`
    );
    const result = await response.json();

    return result.photos.map(
      (photo: any): Photo => ({
        src: photo.img_src,
        id: photo.id,
        sol: photo.sol,
        cameraName: photo.camera.full_name,
        roverName: photo.rover.name,
      })
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
