import React, { ChangeEvent } from "react";
import {useStore} from "../modules/store";

import {Rover} from "../modules/types";
import {observer} from "mobx-react-lite";

export const SolInput = observer(() => {
  const mars = useStore("Mars");

  const inputClass = "sol-input";
  const selectRoverClass = "rover-select";

  const onChangeRover = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedRover = Rover[event.target.value as keyof typeof Rover];
    mars.roverChange(selectedRover);
  };

  const onChangeSol = (event: ChangeEvent<HTMLInputElement>): void => {
    mars.solChange(+event.target.value);
  };

  const onLoadClick = (): void => {
    mars.loadPhotos({ sol: mars.selectedSol, rover: mars.selectedRover });
  };

  return (
    <div>
      <select
        className={selectRoverClass}
        value={mars.selectedRover}
        onChange={onChangeRover}
      >
        <option value={Rover.Perseverance}>Perseverance</option>
        <option value={Rover.Curiosity}>Curiosity</option>
        <option value={Rover.Opportunity}>Opportunity</option>
        <option value={Rover.Spirit}>Spirit</option>
      </select>
      <input
        className={inputClass}
        type={"number"}
        value={mars.selectedSol}
        onChange={onChangeSol}
      ></input>
      <button onClick={onLoadClick}>Load</button>
    </div>
  );
});