import usePokemons from "@/hooks/usePokemons";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PokemonItem from "../components/PokemonItem";

const PokemonIndex = () => {
  const { pokemonIndex } = usePokemons();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 8, marginHorizontal: 16 }}
        columnWrapperStyle={{ gap: 8 }}
        numColumns={2}
        data={pokemonIndex}
        renderItem={({ item }) => (
          <PokemonItem shortName={item.name} image={item.image} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PokemonIndex;
