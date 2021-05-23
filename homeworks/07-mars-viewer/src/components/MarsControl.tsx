import React from "react";
import {
  selectCurrentTab,
  selectFavourites,
  selectPhotos,
} from "../modules/store";
import { MarsPhotoList } from "./MarsPhotoList";
import { useAppSelector } from "../modules/hooks";
import { StatsPage } from "./StatsPage";
import {Route} from "../modules/types";

export function MarsControl(): JSX.Element {
  const tab = useAppSelector(selectCurrentTab);

  if (tab === Route.Nasa) {
    return <MarsPhotoList selectPhotos={selectPhotos} currentTab={tab} />;
  } else if (tab === Route.Favourite) {
    return <MarsPhotoList selectPhotos={selectFavourites} currentTab={tab} />;
  } else if (tab === Route.Stats) {
    return <StatsPage />;
  }

  return <p>Unknown state</p>;
}
