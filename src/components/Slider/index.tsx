import { LayoutChangeEvent } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useCallback, useState } from "react";
import useSliderPan from "./hooks/useSliderPan";
import { createStyleSheet, useStylesWithTheme } from "@stylesheet";
import { View, Text } from "react-native";
import computePickerValue from "./utils/computePickerValue";

const PICKER_SIZE = 23;

type Props = {
  minimalValue: number;
  maximalValue: number;
  value: number;
  onChange: (value: number) => void;
};

const Slider = ({ minimalValue, maximalValue, value, onChange }: Props) => {
  const styles = useStylesWithTheme(stylesheet);
  const [sliderWidth, setSliderWidth] = useState(0);

  const onPickerValueChange = useCallback(
    async (position: number) => {
      onChange(
        computePickerValue(
          position,
          minimalValue,
          maximalValue,
          sliderWidth,
          PICKER_SIZE
        )
      );
    },
    [minimalValue, maximalValue, sliderWidth, onChange]
  );

  const { panGesture, pickerPosition } = useSliderPan({
    sliderWidth,
    initialValue: value,
    onPickerValueChange,
    picker_size: PICKER_SIZE,
  });

  const progressStyle = useAnimatedStyle(() => ({
    width: pickerPosition.value + PICKER_SIZE,
  }));

  const pickerPositionStyle = useAnimatedStyle(() => ({
    left: pickerPosition.value,
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  };

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{minimalValue}</Text>
          <Text style={styles.text}>{maximalValue}</Text>
        </View>
        <View style={styles.sliderContainer} onLayout={onLayout}>
          <Animated.View
            style={[styles.picker, styles.shadow, pickerPositionStyle]}
          />
          <View style={styles.bar}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
        </View>
        <View style={styles.counterContainer}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </View>
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
    width: "100%",
    height: PICKER_SIZE,
    justifyContent: "center",
    marginVertical: 10,
  },
  picker: {
    position: "absolute",
    bottom: 0,
    height: PICKER_SIZE,
    width: PICKER_SIZE,
    borderRadius: PICKER_SIZE,
    backgroundColor: "#fff",
    zIndex: 1,
    borderColor: "#b4b4b4",
    borderOpacity: 0.2,
    borderWidth: 1,
  },
  bar: {
    height: PICKER_SIZE - 2,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: PICKER_SIZE,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#48CFB2",
    zIndex: 1,
    borderRadius: PICKER_SIZE,
  },
  counterContainer: { justifyContent: "center", alignItems: "center" },
  text: { color: colors.text },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));

export default Slider;
