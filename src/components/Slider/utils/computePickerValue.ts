import { PICKER_SIZE } from "..";

const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const computePickerValue = (
  position: number,
  minimalValue: number,
  maximalValue: number,
  sliderWidth: number
) => {
  return clamp(
    minimalValue +
      Math.ceil(
        (position / (sliderWidth - PICKER_SIZE)) * (maximalValue - minimalValue)
      ),
    minimalValue,
    maximalValue
  );
};

export default computePickerValue;
