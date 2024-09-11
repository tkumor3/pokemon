import { PICKER_WIDTH } from "./constants";

export const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

export const computeChosenValue = (
  value: number,
  minimalValue: number,
  maximalValue: number,
  sliderWidth: number
) => {
  return clamp(
    minimalValue +
      Math.ceil(
        (value / (sliderWidth - PICKER_WIDTH)) * (maximalValue - minimalValue)
      ),
    minimalValue,
    maximalValue
  );
};

export const computePointerPosition = (position: number, sliderWidth: number) =>
  clamp(position, PICKER_WIDTH / 2, sliderWidth - PICKER_WIDTH / 2) -
  PICKER_WIDTH / 2;
