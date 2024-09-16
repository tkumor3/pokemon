export const clamp = (val: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(val, min), max);
};

export const computePickerPosition = (
  position: number,
  sliderWidth: number,
  pickerSize: number
) => {
  "worklet";
  return (
    clamp(position, pickerSize / 2, sliderWidth - pickerSize / 2) -
    pickerSize / 2
  );
};
