import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { computePickerPosition } from "../utils/worklets";
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
  onPickerValueChange: (progress: number) => void;
};

const useSliderPan = ({
  sliderWidth,
  initialValue,
  onPickerValueChange,
}: Params) => {
  const pickerPosition = useSharedValue(initialValue);

  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .minDistance(1)
      .onTouchesDown((e) => {
        const pickerPositionValue = computePickerPosition(
          e.allTouches[0].x,
          sliderWidth,
          PICKER_SIZE
        );

        runOnJS(onPickerValueChange)(pickerPositionValue);

        pickerPosition.value = withTiming(pickerPositionValue, {
          duration: 100,
          easing: Easing.linear,
        });
      })
      .onUpdate((e) => {
        {
          const pickerPositionValue = computePickerPosition(
            e.x,
            sliderWidth,
            PICKER_SIZE
          );
          runOnJS(onPickerValueChange)(pickerPositionValue);

          pickerPosition.value = pickerPositionValue;
        }
      });
  }, [sliderWidth, pickerPosition, onPickerValueChange]);

  return { panGesture, pickerPosition };
};

export default useSliderPan;
