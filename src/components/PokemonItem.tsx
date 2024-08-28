import { View, Text, StyleSheet, Image } from "react-native";
import { POKEMON_TYPE_COLORS, PokemonTypes } from "@/src/constants";
import PokemonType from "./PokemonType";

type PokemonItemProps = {
  imageUri: string;
  shortName: string;
  types: PokemonTypes[];
};

const PokemonItem = ({ imageUri, shortName, types }: PokemonItemProps) => {
  return (
    <View
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: imageUri,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff4f",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagsContainer: { flexDirection: "row", gap: 8 },
  imageContainer: {
    aspectRatio: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default PokemonItem;
