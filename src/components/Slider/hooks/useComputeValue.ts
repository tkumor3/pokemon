import { useCallback } from "react";
import { computeChosenValue } from "../utils";

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
        computeChosenValue(progress, minimalValue, maximalValue, sliderWidth)
      );
    },
    [minimalValue, maximalValue, sliderWidth, onChange]
  );

  return { onChangePickerValue };
};

export default useComputeValue;
