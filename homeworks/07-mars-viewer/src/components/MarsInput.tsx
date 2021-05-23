import React from "react";
import { ToggleTab } from "./ToggleTab";
import { SolInput } from "./SolInput";
import { useAppSelector } from "../modules/hooks";
import { selectCurrentTab } from "../modules/store";
import {Route} from "../modules/types";

export function MarsInput(): JSX.Element {
  const currentTab = useAppSelector(selectCurrentTab);
  return (
    <div>
      <ToggleTab />
      {currentTab === Route.Nasa && <SolInput />}
    </div>
  );
}
