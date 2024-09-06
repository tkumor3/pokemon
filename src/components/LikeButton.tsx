import { Pressable, Text } from "react-native";
import { useLikeContext } from "../contexts/LikedContext";
import { useTheme } from "@react-navigation/native";

const LikeButton = ({ pokemonId }: { pokemonId?: number }) => {
  const { colors } = useTheme();
  const { isLiked, toggleLike } = useLikeContext();
  if (!pokemonId) return null;
  const isPokemonLiked = isLiked(pokemonId);
  return (
    <Pressable onPress={() => toggleLike(pokemonId)}>
      {isPokemonLiked ? (
        <Text style={{ color: colors.colorRevert, fontSize: 24 }}>♥</Text>
      ) : (
        <Text style={{ color: colors.colorRevert, fontSize: 24 }}>♡</Text>
      )}
    </Pressable>
  );
};

export default LikeButton;
