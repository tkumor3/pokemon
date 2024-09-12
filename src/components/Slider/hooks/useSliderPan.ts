import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { computePointerPosition } from "../utils";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

type Params = {
  sliderWidth: number;
  initialValue: number;
  computeSelectedValue: (progress: number) => void;
};

const useSliderPan = ({
  sliderWidth,
  initialValue,
  computeSelectedValue,
}: Params) => {
  const pickerPosition = useSharedValue(initialValue);

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .minDistance(2)
      .onTouchesDown((e) => {
        const pointerPosition = computePointerPosition(
          e.allTouches[0].x,
          sliderWidth
        );
        computeSelectedValue(pointerPosition);
        pickerPosition.value = withTiming(pointerPosition, {
          duration: 20,
          easing: Easing.linear,
        });
      })
      .onUpdate((e) => {
        {
          const selectorPosition = computePointerPosition(e.x, sliderWidth);
          computeSelectedValue(selectorPosition);
          pickerPosition.value = selectorPosition;
        }
      })
      .runOnJS(true);
  }, [sliderWidth, pickerPosition, computeSelectedValue]);

  return { panGesture, pickerPosition };
};

export default useSliderPan;
