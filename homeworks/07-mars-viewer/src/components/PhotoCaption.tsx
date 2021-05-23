import React from "react";

interface PhotoCaptionProps {
  cameraName: string;
  roverName: string;
}

export function PhotoCaption({
  cameraName,
  roverName,
}: PhotoCaptionProps): JSX.Element {
  const className = "caption";
  return (
    <span className={className}>
      Rover: {roverName}, Camera: {cameraName}
    </span>
  );
}
