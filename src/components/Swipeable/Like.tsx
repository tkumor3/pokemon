import React, { PropsWithChildren, useMemo, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useLikeContext } from "../../contexts/LikedContext";
import { useSwipeable } from ".";
import { Theme } from "@constants/colors";
import { useTheme } from "@react-navigation/native";

type LikeProps = {
  id: number;
  progress: Animated.AnimatedInterpolation<string | number>;
};

const Like = ({ progress, id }: LikeProps) => {
  const { isLiked, toggleLike } = useLikeContext();
  const { colors } = useTheme();
  const styles = useMemo(() => genStyles(colors), [colors]);
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
  const { onOpenSwipeable } = useSwipeable();
  const swipeRef = useRef<Swipeable | null>(null);

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={(progressAnimatedValue) => (
        <Like id={id} progress={progressAnimatedValue} />
      )}
      onSwipeableWillOpen={() => onOpenSwipeable(swipeRef)}
    >
      {children}
    </Swipeable>
  );
};

const genStyles = (colors: Theme["colors"]) =>
  StyleSheet.create({
    button: {
      borderRadius: 8,
      flex: 1,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
    },
    text: { fontSize: 32, color: colors.text },
  });

export default SwipeableLike;
