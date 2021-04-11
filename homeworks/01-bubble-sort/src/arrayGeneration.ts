
export interface ArrayCell {
  id: number;
  value: number;
}

export const generateWidthArray = function (
  minValue: number,
  maxValue: number
): ArrayCell[] {
  const arrayLength: number = Math.floor(Math.random() * (51 - 10)) + 10;
  const min: number = Math.ceil(minValue);
  const max: number = Math.floor(maxValue);

  const widthArray: ArrayCell[] = [];

  for (let i = 0; i < arrayLength; i++) {
    widthArray.push({
      id: i,
      value: Math.floor(Math.random() * (max - min)) + min,
    });
  }

  return widthArray;
};