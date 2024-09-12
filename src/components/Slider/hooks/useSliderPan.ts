import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { computePointerPosition } from "../utils/worklets";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PICKER_SIZE } from "..";

type Params = {
  sliderWidth: number;
  initialValue: number;
  onChangePickerValue: (progress: number) => void;
};

const useSliderPan = ({
  sliderWidth,
  initialValue,
  onChangePickerValue,
}: Params) => {
  const pickerPosition = useSharedValue(initialValue);

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .minDistance(2)
      .onTouchesDown((e) => {
        const pointerPosition = computePointerPosition(
          e.allTouches[0].x,
          sliderWidth,
          PICKER_SIZE
        );

        runOnJS(onChangePickerValue)(pointerPosition);

        pickerPosition.value = withTiming(pointerPosition, {
          duration: 100,
          easing: Easing.linear,
        });
      })
      .onUpdate((e) => {
        {
          const selectorPosition = computePointerPosition(
            e.x,
            sliderWidth,
            PICKER_SIZE
          );
          runOnJS(onChangePickerValue)(selectorPosition);

          pickerPosition.value = selectorPosition;
        }
      });
  }, [sliderWidth, pickerPosition, onChangePickerValue]);

  return { panGesture, pickerPosition };
};

export default useSliderPan;
