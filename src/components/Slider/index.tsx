import { StyleSheet, LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useCallback, useMemo, useState } from "react";
import throttle from "lodash/throttle";

const PICKER_WIDTH = 26;

type Props = { minimalValue: number; maximalValue: number; value?: number };

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const computeChosenValue = (
  value: number,
  minimalValue: number,
  maximalValue: number,
  sliderWidth: number
) => {
  return clamp(
    minimalValue +
      Math.ceil(
        (value / (sliderWidth - PICKER_WIDTH)) * (maximalValue - minimalValue)
      ),
    minimalValue,
    maximalValue
  );
};

const computePointerPosition = (position: number, sliderWidth: number) =>
  clamp(position, PICKER_WIDTH / 2, sliderWidth - PICKER_WIDTH / 2) -
  PICKER_WIDTH / 2;

const Slider = ({ minimalValue, maximalValue }: Props) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [selectedValue, _setSelectedValue] = useState(minimalValue);
  const setSelectedValue = useMemo(() => throttle(_setSelectedValue, 200), []);
  const pickerPosition = useSharedValue(0);

  const computeSelectedValue = useCallback(
    (progress: number) => {
      setSelectedValue(
        computeChosenValue(progress, minimalValue, maximalValue, sliderWidth)
      );
    },
    [minimalValue, maximalValue, sliderWidth, setSelectedValue]
  );

  const progressStyle = useAnimatedStyle(() => ({
    width: pickerPosition.value + PICKER_WIDTH,
  }));

  const pickerPositionStyle = useAnimatedStyle(() => ({
    left: pickerPosition.value,
  }));

  const flingGesture = useMemo(() => {
    return Gesture.Pan()
      .minDistance(2)
      .onTouchesDown((e) => {
        const pointerPosition = computePointerPosition(
          e.allTouches[0].x,
          sliderWidth
        );
        computeSelectedValue(pointerPosition);
        pickerPosition.value = withTiming(pointerPosition, {
          duration: 100,
          easing: Easing.linear,
        });
      })
      .onUpdate((e) => {
        {
          const selectorPosition = computePointerPosition(e.x, sliderWidth);

          computeSelectedValue(selectorPosition);
          pickerPosition.value = withTiming(selectorPosition, {
            duration: 100,
            easing: Easing.linear,
          });
        }
      })
      .runOnJS(true);
  }, [sliderWidth, computeSelectedValue, pickerPosition]);

  const onLayout = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  return (
    <GestureDetector gesture={flingGesture}>
      <Animated.View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={styles.header}>
          <Animated.Text>{minimalValue}</Animated.Text>
          <Animated.Text>{maximalValue}</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.container} onLayout={onLayout}>
          <Animated.View style={[styles.picker, pickerPositionStyle]} />
          <Animated.View style={styles.bar}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Animated.Text>{selectedValue}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    position: "relative",
    paddingVertical: 20,
    width: "100%",
  },
  picker: {
    position: "absolute",
    top: 17,
    height: 26,
    width: PICKER_WIDTH,
    borderRadius: PICKER_WIDTH,
    backgroundColor: "blue",
    zIndex: 1,
  },
  bar: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "red",
    width: "80%",
    zIndex: 10,
    borderRadius: PICKER_WIDTH,
  },
});

export default Slider;
