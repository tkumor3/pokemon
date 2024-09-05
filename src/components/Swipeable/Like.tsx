import React, { PropsWithChildren, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableProps,
} from "react-native-gesture-handler/Swipeable";
import { useLikeContext } from "../../contexts/LikedContext";
import { useSwipeable } from ".";

const renderActions: (
  liked: boolean,
  toggleLike: () => void
) => SwipeableProps["renderRightActions"] =
  // eslint-disable-next-line react/display-name
  (like, toggleLike) => (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <RectButton style={styles.button} onPress={toggleLike}>
          <Text style={styles.text}>{like ? "♥" : "♡"}</Text>
        </RectButton>
      </Animated.View>
    );
  };

type Props = PropsWithChildren<{ id: number }>;

const SwipeableLike = ({ id, children }: Props) => {
  const { onOpenNextSwipeable } = useSwipeable();
  const swipeRef = useRef<Swipeable | null>(null);
  const { isLiked, toggleLike } = useLikeContext();
  const liked = isLiked(id);

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderActions(liked, () => {
        toggleLike(id);
        swipeRef.current?.close();
      })}
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
