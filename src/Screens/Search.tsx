import React from "react";

import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import PokemonList from "@components/PokemonList";
import usePokemons from "../hooks/usePokemons";
import { TabScreenProps } from "./types";

type Props = TabScreenProps<"Search">;

const Search = ({ navigation }: Props) => {
  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    usePokemons();

  const handlePress = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require("assets/images/pokemon_logo.png")}
        />
      </View>
      <PokemonList
        pokemons={pokemonIndex}
        loading={loading}
        error={error}
        fetchMore={fetchMore}
        loadingMore={loadingMore}
        handlePress={handlePress}
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

export default Search;
