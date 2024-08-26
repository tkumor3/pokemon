import usePokemons, { PokemonIndexResponse } from "@/hooks/usePokemons";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PokemonItem from "../components/PokemonItem";

const flatPokemonResults = (
  data?: InfiniteData<PokemonIndexResponse, unknown>
) => {
  if (!data) return [];
  return data?.pages.map((page) => page.results).flat();
};

const PokemonIndex = () => {
  const { data, fetchNextPage } = usePokemons();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 8, marginHorizontal: 16 }}
        columnWrapperStyle={{ gap: 8 }}
        numColumns={2}
        data={flatPokemonResults(data)}
        renderItem={({ item }) => <PokemonItem shortName={item.name} />}
        keyExtractor={(item) => item.name}
        onEndReached={() => fetchNextPage()}
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
