import React from "react";
import { MarsPhoto } from "./MarsPhoto";
import { RootState } from "../modules/store";
import { useAppSelector } from "../modules/hooks";
import { PhotoStatus } from "./PhotoStatus";
import {Photo, Route} from "../modules/types";

interface MarsPhotoListProps {
  selectPhotos: (state: RootState) => Photo[];
  currentTab: Route;
}

export function MarsPhotoList({
  selectPhotos,
  currentTab,
}: MarsPhotoListProps): JSX.Element {
  const photos = useAppSelector(selectPhotos);
  const className = "mars-photos-wrapper";

  if (photos.length === 0) {
    return <PhotoStatus currentTab={currentTab} />;
  }
  return (
    <div className={className}>
      {photos.map((photo) => (
        <MarsPhoto key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
