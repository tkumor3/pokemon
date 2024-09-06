import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from "react";
import SwipeableLib from "react-native-gesture-handler/Swipeable";
import Like from "./Like";

type SwipeableContextType = {
  onOpenSwipeable: (next: React.RefObject<SwipeableLib | null>) => void;
};

const SwipeableContext = createContext<SwipeableContextType>({
  onOpenSwipeable: () => {},
});

export const Provider = ({ children }: PropsWithChildren) => {
  const openedSwipeableRef = useRef<SwipeableLib | null>(null);

  const onOpenSwipeable = useCallback(
    (next: React.RefObject<SwipeableLib | null>) => {
      openedSwipeableRef.current?.close();
      openedSwipeableRef.current = next.current;
    },
    []
  );

  return (
    <SwipeableContext.Provider value={{ onOpenSwipeable }}>
      {children}
    </SwipeableContext.Provider>
  );
};

const Swipeable = { Provider, Like };

export const useSwipeable = () => useContext(SwipeableContext);

export default Swipeable;
