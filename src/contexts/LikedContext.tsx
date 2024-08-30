import { createContext, useCallback, useState, useContext } from "react";

interface LikedContextType {
  likedList: number[];

  toggleLike: (id: number) => void;
  isLiked: (id?: number) => boolean;
}

const LikedContext = createContext<LikedContextType>({
  likedList: [],
  toggleLike: () => {},
  isLiked: () => false,
});

const LikedContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedList, setLikedList] = useState<number[]>([]);

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
      return likedList.includes(id);
    },
    [likedList]
  );

  return (
    <LikedContext.Provider value={{ likedList, toggleLike, isLiked }}>
      {children}
    </LikedContext.Provider>
  );
};
const useLikeContext = () => {
  const context = useContext(LikedContext);
  if (!context) {
    throw new Error(
      "useLikedContext must be used within a LikedContextProvider"
    );
  }
  return context;
};

export { LikedContextProvider, useLikeContext };
