import { Image } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Animated, { Easing } from "react-native-reanimated";

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

const RotatingImage = ({ imageUri }: { imageUri?: string }) => {
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  const longPress = Gesture.LongPress()
    .minDuration(2000)
    .onStart(() => {
      rotation.value = withTiming(1, { duration, easing });
    })
    .onFinalize(() => {
      rotation.value = 0;
    });

  return (
    <GestureDetector gesture={longPress}>
      <Animated.View style={animatedStyle}>
        <Image
          width={200}
          height={200}
          source={{
            uri: imageUri,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default RotatingImage;
