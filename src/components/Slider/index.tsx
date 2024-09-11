import { LayoutChangeEvent } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useState } from "react";
import { PICKER_WIDTH } from "./constants";
import useSliderPan from "./hooks/useSliderPan";
import { createStyleSheet, useStylesWithTheme } from "@stylesheet";
import useComputeValue from "./hooks/useComputeValue";

type Props = {
  minimalValue: number;
  maximalValue: number;
  value: number;
  onChange: (value: number) => void;
};

const Slider = ({ minimalValue, maximalValue, value, onChange }: Props) => {
  const styles = useStylesWithTheme(stylesheet);
  const [sliderWidth, setSliderWidth] = useState(0);
  const { computeSelectedValue } = useComputeValue({
    minimalValue,
    maximalValue,
    sliderWidth,
    onChange,
  });

  const { panGesture, pickerPosition } = useSliderPan({
    sliderWidth,
    computeSelectedValue,
    initialValue: value,
  });

  const progressStyle = useAnimatedStyle(() => ({
    width: pickerPosition.value + PICKER_WIDTH,
  }));

  const pickerPositionStyle = useAnimatedStyle(() => ({
    left: pickerPosition.value,
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container}>
        <Animated.View style={styles.header}>
          <Animated.Text style={styles.text}>{minimalValue}</Animated.Text>
          <Animated.Text style={styles.text}>{maximalValue}</Animated.Text>
        </Animated.View>
        <Animated.View style={styles.sliderContainer} onLayout={onLayout}>
          <Animated.View style={[styles.picker, pickerPositionStyle]} />
          <Animated.View style={styles.bar}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </Animated.View>
        </Animated.View>
        <Animated.View style={styles.counterContainer}>
          <Animated.Text style={styles.text}>{value}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const stylesheet = createStyleSheet((colors) => ({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  sliderContainer: {
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
  counterContainer: { justifyContent: "center", alignItems: "center" },
  text: { color: colors.text },
}));

export default Slider;
