import Error from "@components/Error";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import PokemonItem from "./PokemonItem";
import useLikedPokemons from "../hooks/useLikedPokemons";

const PokemonLikedList = () => {
  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    useLikedPokemons();

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
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
      keyExtractor={(item) => item.name}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
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

export default PokemonLikedList;
