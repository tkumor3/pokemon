import Slider from "@components/Slider";
import { View, StyleSheet } from "react-native";

const SliderScreen = () => {
  return (
    <View style={styles.container}>
      <Slider minimalValue={20} maximalValue={100} />
      <Slider minimalValue={40} maximalValue={100} />
      <Slider minimalValue={1} maximalValue={200} />
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
