import React from "react";
import {MarsPhoto} from "./MarsPhoto";
import {PhotoStatus} from "./PhotoStatus";
import {Photo, Route} from "../modules/types";

interface MarsPhotoListProps {
  selectPhotos: Photo[];
  currentTab: Route;
}

export const MarsPhotoList = ({selectPhotos, currentTab}: MarsPhotoListProps) => {
  const className = "mars-photos-wrapper";

  if (selectPhotos.length === 0) {
    return <PhotoStatus currentTab={currentTab} />;
  }

  return (
    <div className={className}>
      {selectPhotos.map((photo) => (
        <MarsPhoto key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
