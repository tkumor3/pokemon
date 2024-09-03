import {
  Easing,
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const duration = 700;
const easing = Easing.bezier(0, 0.25, 0.25, 1);

const useScrollHandler = (searchBar: SharedValue<number>) => {
  const isScrolling = useSharedValue(false);
  const lastContentOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (lastContentOffset.value > event.contentOffset.y) {
        if (isScrolling.value) {
          searchBar.value = withTiming(1, { duration, easing });
        }
      } else if (lastContentOffset.value < event.contentOffset.y) {
        if (isScrolling.value) {
          searchBar.value = withTiming(0, { duration, easing });
        }
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {
      isScrolling.value = true;
    },
    onEndDrag: (e) => {
      isScrolling.value = false;
    },
  });
  return scrollHandler;
};

export default useScrollHandler;
