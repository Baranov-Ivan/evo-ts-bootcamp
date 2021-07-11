import React from "react";
import {ToggleTab} from "./ToggleTab";
import {SolInput} from "./SolInput";
import {useStore} from "../modules/store";
import {Route} from "../modules/types";
import {observer} from "mobx-react-lite";

export const MarsInput = observer(() => {
    const route = useStore("Routes");
    return (
        <div>
          <ToggleTab />
          {route.selectedRoute === Route.Nasa && <SolInput />}
        </div>
  );
});
