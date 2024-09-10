import { StyleSheet, LayoutChangeEvent } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useState } from "react";

type Props = { minimalValue: number; maximalValue: number; value?: number };

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
const computeValue = (
  progress: number,
  minimalValue: number,
  maximalValue: number
) => {
  return Math.ceil(
    (progress / 100) * (maximalValue - minimalValue) + minimalValue
  );
};

const computeProgress = (
  value: number,
  minimalValue: number,
  maximalValue: number
) => {
  return ((value - minimalValue) / (maximalValue - minimalValue)) * 100;
};

const Slider = ({ minimalValue, maximalValue }: Props) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [selectedValue, setSelectedValue] = useState(minimalValue);

  const position = useSharedValue(0);
  const computeSelectedValue = (progress: number) => {
    setSelectedValue(computeValue(progress, minimalValue, maximalValue));
  };

  useAnimatedReaction(
    () => {
      return position.value;
    },
    (currentValue, previous) => {
      if (currentValue !== previous) {
        runOnJS(computeSelectedValue)(currentValue);
      }
    }
  );

  const flingGesture = Gesture.Pan()
    .minDistance(2)
    .onTouchesDown((e) => {
      const selectorPosition = clamp(
        e.changedTouches[0].x,
        0,
        sliderWidth - 26
      );
      position.value = selectorPosition;
    })
    .onUpdate((e) => {
      {
        const selectorPosition = clamp(e.x, 0, sliderWidth - 26);
        position.value = selectorPosition;
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    width: position.value + 13,
  }));

  const pickerPosition = useAnimatedStyle(() => ({
    left: position.value,
  }));
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
          <Animated.View style={[styles.picker, pickerPosition]} />
          <Animated.View style={styles.bar}>
            <Animated.View style={[styles.progressBar, animatedStyle]} />
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
    width: 26,
    borderRadius: 26,
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
  },
});

export default Slider;
