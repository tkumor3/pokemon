import { useCallback } from "react";
import computePickerValue from "../utils/computePickerValue";

type Params = {
  minimalValue: number;
  maximalValue: number;
  sliderWidth: number;
  onChange: (value: number) => void;
};
const useComputeValue = ({
  minimalValue,
  maximalValue,
  sliderWidth,
  onChange,
}: Params) => {
  const onChangePickerValue = useCallback(
    async (progress: number) => {
      onChange(
        computePickerValue(progress, minimalValue, maximalValue, sliderWidth)
      );
    },
    [minimalValue, maximalValue, sliderWidth, onChange]
  );

  return { onChangePickerValue };
};

export default useComputeValue;
