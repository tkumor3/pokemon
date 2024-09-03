import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { POKEMON_TYPE_COLORS, PokemonTypes } from "@/src/constants";
import PokemonType from "./PokemonType";

type PokemonItemProps = {
  imageUri: string;
  shortName: string;
  types: PokemonTypes[];
  navigateToPokemon: (name: string) => void;
};

const PokemonItem = ({
  imageUri,
  shortName,
  types,
  navigateToPokemon,
}: PokemonItemProps) => {
  return (
    <Pressable
      onPress={() => navigateToPokemon(shortName)}
      style={[
        { backgroundColor: POKEMON_TYPE_COLORS[types[0]] },
        styles.pokemonItem,
      ]}
    >
      <View style={styles.gap}>
        <Text style={styles.title}>{shortName}</Text>
        <View style={styles.tagsContainer}>
          {types.map((type) => (
            <PokemonType key={type} type={type} />
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
    </Pressable>
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
  gap: { gap: 8 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default PokemonItem;
