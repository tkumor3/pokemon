import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = { progress: number };

const ProgressBar = ({ progress }: Props) => {
  const progressSv = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressSv.value}%`,
  }));

  useEffect(() => {
    progressSv.value = withTiming(progress, { duration: 1000 });
  }, [progress, progressSv]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ff0000",
  },
});

export default ProgressBar;
