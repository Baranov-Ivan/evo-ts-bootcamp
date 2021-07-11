import React from "react";

import {MarsControl} from "./MarsControl";
import {MarsInput} from "./MarsInput";

export const MarsViewer = (): JSX.Element => {
    return (
    <div>
      <MarsInput />
      <MarsControl />
    </div>
  );
}
