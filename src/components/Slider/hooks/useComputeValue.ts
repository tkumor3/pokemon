import { useCallback, useMemo } from "react";
import { computeChosenValue } from "../utils";
import throttle from "lodash/throttle";

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
  const _computeSelectedValue = useCallback(
    (progress: number) => {
      onChange(
        computeChosenValue(progress, minimalValue, maximalValue, sliderWidth)
      );
    },
    [minimalValue, maximalValue, sliderWidth, onChange]
  );
  const computeSelectedValue = useMemo(
    () => throttle(_computeSelectedValue, 200),
    [_computeSelectedValue]
  );

  return { computeSelectedValue };
};

export default useComputeValue;
