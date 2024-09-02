import { Pressable, Text } from "react-native";
import { useLikeContext } from "../contexts/LikedContext";

const LikeButton = ({ pokemonId }: { pokemonId: number | undefined }) => {
  const { isLiked, toggleLike } = useLikeContext();
  if (!pokemonId) return null;
  const isPokemonLiked = isLiked(pokemonId);
  return (
    <Pressable onPress={() => toggleLike(pokemonId)}>
      <Text style={{ color: "#fff", fontSize: 24 }}>
        {isPokemonLiked ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
};

export default LikeButton;
