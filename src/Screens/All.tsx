import React from "react";

import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import PokemonList, { useScrollHandler } from "@components/PokemonList";
import usePokemons from "../hooks/usePokemons";
import { TabScreenProps } from "./types";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import debounce from "lodash/debounce";

type Props = TabScreenProps<"All">;

const All = ({ navigation }: Props) => {
  const [search, _setSearch] = React.useState("");
  const setSearch = debounce(_setSearch, 500);

  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    usePokemons(search);

  const searchBar = useSharedValue(0);
  const scrollHandler = useScrollHandler(searchBar);

  const navigateToPokemon = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    top: search === "" ? -100 + searchBar.value * 100 : 0,
  }));

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
        navigateToPokemon={navigateToPokemon}
        onScroll={scrollHandler}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <PokemonList.SearchBar
            animatedStyle={animatedStyle}
            onChange={setSearch}
          />
        }
        ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ListHeaderComponentStyle: {
    position: "relative",
    height: 70,
  },
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

export default All;
