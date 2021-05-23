import React, { ChangeEvent } from "react";
import {
  loadPhotos,
  solChange,
  roverChange,
} from "../modules/storeSlices/marsSlice";
import {
  selectCurrentRover,
  selectCurrentSol,
} from "../modules/store";
import { useAppDispatch, useAppSelector } from "../modules/hooks";
import {Rover} from "../modules/types";

export function SolInput(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentSol = useAppSelector(selectCurrentSol);
  const currentRover = useAppSelector(selectCurrentRover);

  const inputClass = "sol-input";
  const selectRoverClass = "rover-select";

  const onChangeRover = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedRover = Rover[event.target.value as keyof typeof Rover];
    dispatch(roverChange(selectedRover));
  };

  const onChangeSol = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(solChange(+event.target.value));
  };

  const onLoadClick = (): void => {
    dispatch(loadPhotos({ sol: currentSol, rover: currentRover }));
  };

  return (
    <div>
      <select
        className={selectRoverClass}
        value={currentRover}
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
        value={currentSol}
        onChange={onChangeSol}
      ></input>
      <button onClick={onLoadClick}>Load</button>
    </div>
  );
}
