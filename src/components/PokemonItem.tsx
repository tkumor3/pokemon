import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { POKEMON_TYPE_COLORS, PokemonTypes } from "@/src/constants";
import PokemonType from "./PokemonType";
import { useNavigation } from "@react-navigation/native";

type PokemonItemProps = {
  imageUri: string;
  shortName: string;
  types: PokemonTypes[];
};

const PokemonItem = ({ imageUri, shortName, types }: PokemonItemProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    return navigation.navigate("Pokemon", { name: shortName });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        { backgroundColor: POKEMON_TYPE_COLORS[types[0]] },
        styles.pokemonItem,
      ]}
    >
      <View style={{ gap: 8 }}>
        <Text style={styles.title}>{shortName}</Text>
        <View style={styles.tagsContainer}>
          {types.map((type) => (
            <PokemonType type={type} />
          ))}
        </View>
      </View>
      <Image
        width={70}
        height={70}
        source={{
          uri: imageUri,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff4f",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagsContainer: { flexDirection: "row", gap: 8 },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default PokemonItem;
