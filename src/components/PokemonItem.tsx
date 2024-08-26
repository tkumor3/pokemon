import { View, Text, StyleSheet } from "react-native";

type PokemonItemProps = {
  url?: string; // Will be used later
  shortName: string;
};

const PokemonItem = ({ url, shortName }: PokemonItemProps) => {
  return (
    <View style={styles.pokemonItem}>
      <View style={styles.image}>
        <Text>Image</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>{shortName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonItem: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#fff",
    padding: 14,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokemonItem;
