import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import { getData, storeData } from "../utils/asyncStorage";

const LIKE_LIST_KEY = "likeList" as const;

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

const LikeContextProvider = ({ children }: React.PropsWithChildren) => {
  const [likeList, setLikedList] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      const initialLikes = await getData<number[]>(LIKE_LIST_KEY);
      if (initialLikes) {
        setLikedList(initialLikes);
      }
    })();
  }, []);

  const toggleLike = useCallback((id: number) => {
    setLikedList((prev) => {
      const nextLikeList = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      storeData(LIKE_LIST_KEY, nextLikeList);
      return nextLikeList;
    });
  }, []);

  const isLiked = useCallback(
    (id: number | undefined) => {
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
