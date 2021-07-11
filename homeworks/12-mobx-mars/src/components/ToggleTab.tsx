import React from "react";
import {useStore} from "../modules/store";
import {Route} from "../modules/types";
import {observer} from "mobx-react-lite";

export const ToggleTab = observer(() => {
    const route = useStore("Routes");

    const availableClass = "tab-option";
    const activeClass = "tab-selected";

    const headerClass = "header";

    const onTabClick = (tab: Route): void => {
      route.routeChange(tab);
    };

    return (
    <>
      <p>
        <span
          className={route.selectedRoute === Route.Nasa ? activeClass : availableClass}
          onClick={() => onTabClick(Route.Nasa)}
        >
          Photos
        </span>{" "}
        |{" "}
        <span
          className={
            route.selectedRoute === Route.Favourite ? activeClass : availableClass
          }
          onClick={() => onTabClick(Route.Favourite)}
        >
          Favourites
        </span>{" "}
        |{" "}
        <span
          className={route.selectedRoute === Route.Stats ? activeClass : availableClass}
          onClick={() => onTabClick(Route.Stats)}
        >
          Statistics
        </span>
      </p>
      {route.selectedRoute === Route.Nasa && (
        <p className={headerClass}>
          Select Rover and Sol {"->"} press "Load" ??? Enjoy!
        </p>
      )}
    </>
  );
});