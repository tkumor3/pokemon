import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { getData, storeData } from "../utils";

interface LikeContextType {
  likeList: number[];
  toggleLike: (id: number) => void;
  isLiked: (id?: number) => boolean;
}

const LikeContext = createContext<LikeContextType>({
  likeList: [],
  toggleLike: () => {},
  isLiked: () => false,
});

const LikeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const isFirstRender = useRef(true);
  const [likeList, setLikedList] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const initialLikes = await getData<number[]>("likeList");
      if (initialLikes) {
        setLikedList(initialLikes);
      }
    })();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    storeData("likeList", likeList);
  }, [likeList]);

  const toggleLike = useCallback((id: number) => {
    setLikedList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const isLiked = useCallback(
    (id?: number) => {
      if (!id) return false;
      return likeList.includes(id);
    },
    [likeList]
  );

  return (
    <LikeContext.Provider value={{ likeList, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
};
const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLikeContext must be used within a LikeContext");
  }
  return context;
};

export { LikeContextProvider, useLikeContext };
