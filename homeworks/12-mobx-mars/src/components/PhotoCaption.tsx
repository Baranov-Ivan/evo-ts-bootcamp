import React from "react";

interface PhotoCaptionProps {
  cameraName: string;
  roverName: string;
}

export const PhotoCaption = ({cameraName, roverName}: PhotoCaptionProps): JSX.Element => {
  const className = "caption";
  return (
    <span className={className}>
      Rover: {roverName}, Camera: {cameraName}
    </span>
  );
}
