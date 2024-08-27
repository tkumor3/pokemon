import { View, Text, StyleSheet, Image } from "react-native";

type PokemonItemProps = {
  imageUri: string;
  shortName: string;
};

const PokemonItem = ({ imageUri, shortName }: PokemonItemProps) => (
  <View style={styles.pokemonItem}>
    <View style={styles.image}>
      <Image
        style={styles.image}
        source={{
          uri: imageUri,
        }}
      />
    </View>
    <View style={styles.textContainer}>
      <Text>{shortName}</Text>
    </View>
  </View>
);

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
    width: null,
    height: null,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokemonItem;
