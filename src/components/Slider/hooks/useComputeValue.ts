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
  const computeSelectedValue = useCallback(
    (progress: number) => {
      onChange(
        computeChosenValue(progress, minimalValue, maximalValue, sliderWidth)
      );
    },
    [minimalValue, maximalValue, sliderWidth, onChange]
  );

  return { computeSelectedValue };
};

export default useComputeValue;
