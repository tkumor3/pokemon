import { PICKER_SIZE } from ".";

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
        (value / (sliderWidth - PICKER_SIZE)) * (maximalValue - minimalValue)
      ),
    minimalValue,
    maximalValue
  );
};

export const computePointerPosition = (position: number, sliderWidth: number) =>
  clamp(position, PICKER_SIZE / 2, sliderWidth - PICKER_SIZE / 2) -
  PICKER_SIZE / 2;
