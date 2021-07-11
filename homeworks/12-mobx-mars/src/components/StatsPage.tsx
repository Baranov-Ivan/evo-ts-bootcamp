import React from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "../modules/store";

export const StatsPage = observer(() => {
  const mars = useStore("Mars");
  const favourites = useStore("Favourites");

  if (Object.keys(mars.sols).length === 0) {
    return (
      <div>
        <p>No loaded sols</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>List of loaded sols:</p>
        <div className={"sols-list"}>
          {Object.keys(mars.sols).map((solRoverKey) => (
            <p key={solRoverKey}>
                Rover: {mars.sols[solRoverKey].rover}; Sol: {mars.sols[solRoverKey].sol};
            </p>
          ))}
        </div>
        <p>Favourite photos count: {favourites.selectFavouritesIds.length}</p>
      </div>
    );
  }
});