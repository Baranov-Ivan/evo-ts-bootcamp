export interface Position {
  x: number;
  y: number;
}

export const positions: Position[] = [
  { x: 0, y: 100 },
  { x: 50, y: 0 },
  { x: 50, y: 300 },
  { x: 100, y: 400 },
  { x: 150, y: 50 },
  { x: 150, y: 250 },
  { x: 200, y: 150 },
  { x: 250, y: 350 },
  { x: 350, y: 100 },
  { x: 350, y: 400 },
  { x: 400, y: 200 },
  { x: 450, y: 450 }
];

export const textBlock = document.getElementById("score");
export const startButton = document.getElementById(
  "start"
) as HTMLButtonElement;
export const container = document.getElementById("wrapper");

export const catImg = document.getElementById("cat");

export const randomNumber = (): number => {
  return Math.floor(Math.random() * 11);
};

export const checkNumber = (
  prevElem: Position,
  curElem: Position
): Position => {
  while (prevElem.x === curElem.x && prevElem.y === curElem.y)
    curElem = positions[randomNumber()];
  return curElem;
};

export const showCat = (): void => {
  catImg!.style.visibility = "visible";
};

export const disableButton = (): void => {
  startButton!.disabled = true;
};

export const render = (pos: Position): void => {
  catImg!.style.top = pos.x + "px";
  catImg!.style.left = pos.y + "px";
};
