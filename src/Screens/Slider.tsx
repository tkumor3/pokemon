import Slider from "@components/Slider";
import { createStyleSheet, useStylesWithTheme } from "@stylesheet";
import throttle from "lodash/throttle";
import { useMemo, useState } from "react";
import { View } from "react-native";

const SliderScreen = () => {
  const styles = useStylesWithTheme(stylesheet);
  const [slider1, setSlider1] = useState(20);
  const [slider2, _setSlider2] = useState(50);
  const [slider3, setSlider3] = useState(30);
  const setSlider2 = useMemo(() => throttle(_setSlider2, 200), []);
  return (
    <View style={styles.container}>
      <Slider
        minimalValue={20}
        maximalValue={100}
        value={slider1}
        onChange={setSlider1}
      />
      <Slider
        minimalValue={40}
        maximalValue={100}
        value={slider2}
        onChange={setSlider2}
      />
      <Slider
        minimalValue={1}
        maximalValue={200}
        value={slider3}
        onChange={setSlider3}
      />
    </View>
  );
};

const stylesheet = createStyleSheet((colors) => ({
  container: {
    gap: 20,
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundColor,
  },
}));

export default SliderScreen;
