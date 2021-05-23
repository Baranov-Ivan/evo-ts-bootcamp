import React from "react";
import { useAppDispatch, useAppSelector } from "../modules/hooks";
import { selectCurrentTab } from "../modules/store";
import { routeChange } from "../modules/storeSlices/routesSlice";
import {Route} from "../modules/types";

export function ToggleTab(): JSX.Element {
  const currentTab = useAppSelector(selectCurrentTab);
  const dispatch = useAppDispatch();

  const availableClass = "tab-option";
  const activeClass = "tab-selected";

  const headerClass = "header";

  const onTabClick = (tab: Route): void => {
    dispatch(routeChange(tab));
  };

  return (
    <>
      <p>
        <span
          className={currentTab === Route.Nasa ? activeClass : availableClass}
          onClick={() => onTabClick(Route.Nasa)}
        >
          Photos
        </span>{" "}
        |{" "}
        <span
          className={
            currentTab === Route.Favourite ? activeClass : availableClass
          }
          onClick={() => onTabClick(Route.Favourite)}
        >
          Favourites
        </span>{" "}
        |{" "}
        <span
          className={currentTab === Route.Stats ? activeClass : availableClass}
          onClick={() => onTabClick(Route.Stats)}
        >
          Statistics
        </span>
      </p>
      {currentTab === Route.Nasa && (
        <p className={headerClass}>
          Select Rover and Sol {"->"} press "Load" ??? Enjoy!
        </p>
      )}
    </>
  );
}
