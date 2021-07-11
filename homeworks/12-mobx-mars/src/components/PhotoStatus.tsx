import React from "react";
import {useStore} from "../modules/store";
import {
  FailedMessage,
  LoadingMessage,
  NoFavouritePhotosMessage,
  NoLoadedMessage,
  NoPhotosMessage,
} from "./StatusComponents";
import {Route, Status} from "../modules/types";
import {observer} from "mobx-react-lite";

interface PhotoStatusProps {
  currentTab: Route;
}

export const PhotoStatus = observer(({currentTab}: PhotoStatusProps) => {
  const mars = useStore("Mars");

  if (currentTab === Route.Favourite) {
    return <NoFavouritePhotosMessage />;
  }

  switch (mars.selectStatus) {
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
});
