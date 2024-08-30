import { Pressable, Text } from "react-native";
import { useLikeContext } from "../contexts/LikedContext";

const LikeButton = ({ pokemonId }: { pokemonId?: number }) => {
  const { isLiked, toggleLike } = useLikeContext();
  if (!pokemonId) return null;
  const isPokemonLiked = isLiked(pokemonId);
  return (
    <Pressable onPress={() => toggleLike(pokemonId)}>
      {isPokemonLiked ? (
        <Text style={{ color: "#fff", fontSize: 24 }}>♥</Text>
      ) : (
        <Text style={{ color: "#fff", fontSize: 24 }}>♡</Text>
      )}
    </Pressable>
  );
};

export default LikeButton;
