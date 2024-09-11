import Slider from "@components/Slider";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

const SliderScreen = () => {
  const [slider1, setSlider1] = useState(20);
  const [slider2, setSlider2] = useState(50);
  const [slider3, setSlider3] = useState(30);
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

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SliderScreen;
