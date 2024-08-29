import usePokemons from "@/hooks/usePokemons";
import Error from "@components/Error";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import PokemonItem from "./PokemonItem";

const PokemonList = () => {
  const { pokemonIndex, loading, error } = usePokemons();
  if (error) {
    return <Error />;
  }
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
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
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokemonList;
