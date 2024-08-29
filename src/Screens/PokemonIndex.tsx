import React from "react";
import { View, StyleSheet, FlatList, Image, SafeAreaView } from "react-native";
import PokemonItem from "@components/PokemonItem";
import usePokemons from "../hooks/usePokemons";

const PokemonIndex = () => {
  const { pokemonIndex } = usePokemons();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require("assets/images/pokemon_logo.png")}
        />
      </View>

      <FlatList
        contentContainerStyle={{ gap: 16, marginHorizontal: 16 }}
        data={pokemonIndex}
        renderItem={({ item }) => (
          <PokemonItem
            shortName={item.name}
            imageUri={item.imageUri}
            types={item.types}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoImage: { flex: 1, height: "100%" },
  logoContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PokemonIndex;
