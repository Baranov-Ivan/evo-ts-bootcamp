import React from "react";
import { useAppSelector } from "../modules/hooks";
import { selectStatus } from "../modules/store";
import {
  FailedMessage,
  LoadingMessage,
  NoFavouritePhotosMessage,
  NoLoadedMessage,
  NoPhotosMessage,
} from "./StatusComponents";
import {Route, Status} from "../modules/types";

interface PhotoStatusProps {
  currentTab: Route;
}

export function PhotoStatus({ currentTab }: PhotoStatusProps): JSX.Element {
  const status = useAppSelector(selectStatus);

  if (currentTab === Route.Favourite) {
    return <NoFavouritePhotosMessage />;
  }

  switch (status) {
    case Status.Idle:
      return <NoLoadedMessage />;
    case Status.Loading:
      return <LoadingMessage />;
    case Status.Loaded:
      return <NoPhotosMessage />;
    case Status.Failed:
      return <FailedMessage />;
    default:
      return <p>Unknown state</p>;
  }
}
