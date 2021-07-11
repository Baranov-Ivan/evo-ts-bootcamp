import React from "react";
import {useStore} from "../modules/store";
import {MarsPhotoList} from "./MarsPhotoList";
import {StatsPage} from "./StatsPage";
import {Route} from "../modules/types";
import {observer} from "mobx-react-lite";

export const MarsControl = observer(()=> {
  const route = useStore("Routes");
  const mars = useStore("Mars");
  const favourites = useStore("Favourites");

  if (route.selectedRoute === Route.Nasa) {
    return <MarsPhotoList selectPhotos={mars.selectPhotos} currentTab={route.selectedRoute} />;
  } else if (route.selectedRoute === Route.Favourite) {
    return <MarsPhotoList selectPhotos={favourites.selectFavourites} currentTab={route.selectedRoute} />;
  } else if (route.selectedRoute === Route.Stats) {
    return <StatsPage />;
  }

  return <p>Unknown state</p>;
});
