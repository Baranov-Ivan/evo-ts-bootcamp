import React from "react";
import { useAppSelector } from "../modules/hooks";
import { selectFavouritesIds, selectSols } from "../modules/store";

export function StatsPage(): JSX.Element {
  const sols = useAppSelector(selectSols);
  const favourites = useAppSelector(selectFavouritesIds);
  if (Object.keys(sols).length === 0) {
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
          {Object.keys(sols).map((solRoverKey) => (
            <p key={solRoverKey}>
                Rover: {sols[solRoverKey].rover}; Sol: {sols[solRoverKey].sol};
            </p>
          ))}
        </div>
        <p>Favourite photos count: {favourites.length}</p>
      </div>
    );
  }
}
