import React, { PropsWithChildren, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useLikeContext } from "../../contexts/LikedContext";
import { useSwipeable } from ".";

type LikeProps = {
  id: number;
  progress: Animated.AnimatedInterpolation<string | number>;
};

const Like = ({ progress, id }: LikeProps) => {
  const { isLiked, toggleLike } = useLikeContext();
  const liked = isLiked(id);

  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={{ transform: [{ translateX: trans }] }}>
      <RectButton style={styles.button} onPress={() => toggleLike(id)}>
        <Text style={styles.text}>{liked ? "♥" : "♡"}</Text>
      </RectButton>
    </Animated.View>
  );
};

type Props = PropsWithChildren<{ id: number }>;

const SwipeableLike = ({ id, children }: Props) => {
  const { onOpenNextSwipeable } = useSwipeable();
  const swipeRef = useRef<Swipeable | null>(null);

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={(progressAnimatedValue) => (
        <Like id={id} progress={progressAnimatedValue} />
      )}
      onSwipeableWillOpen={() => onOpenNextSwipeable(swipeRef)}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 32 },
});

export default SwipeableLike;
