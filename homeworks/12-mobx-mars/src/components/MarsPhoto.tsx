import React from "react";
import {FavouriteIcon} from "./FavoutireIcon";
import {PhotoCaption} from "./PhotoCaption";
import {Photo} from "../modules/types";

interface MarsPhotoProps {
  photo: Photo;
}

export const MarsPhoto = ({ photo }: MarsPhotoProps): JSX.Element => {
  const containerStyle = "photo-container";
  const imgStyle = "mars-photo";
  return (
    <div className={containerStyle}>
      <FavouriteIcon photoId={photo.id} />
      <img className={imgStyle} src={photo.src} alt="" loading="lazy"></img>
      <PhotoCaption cameraName={photo.cameraName} roverName={photo.roverName} />
    </div>
  );
}