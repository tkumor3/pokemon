const clamp = (val: number, min: number, max: number) => {
  return Math.min(Math.max(val, min), max);
};

const computePickerValue = (
  position: number,
  minimalValue: number,
  maximalValue: number,
  sliderWidth: number,
  picker_size: number
) => {
  return clamp(
    minimalValue +
      Math.ceil(
        (position / (sliderWidth - picker_size)) * (maximalValue - minimalValue)
      ),
    minimalValue,
    maximalValue
  );
};

export default computePickerValue;
