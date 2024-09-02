import Error from "@components/Error";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import PokemonItem from "./PokemonItem";
import { ApolloError } from "@apollo/client";
import { Pokemon } from "../types";

type Props = {
  pokemons: Pokemon[];
  loading: boolean;
  error?: ApolloError;
  fetchMore: () => void;
  loadingMore: boolean;
  handlePress: (name: string) => void;
};

const PokemonLikedList = ({
  pokemons,
  loading,
  error,
  fetchMore,
  loadingMore,
  handlePress,
}: Props) => {
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
      contentContainerStyle={styles.contentContainerStyle}
      data={pokemons}
      renderItem={({ item }) => (
        <PokemonItem
          handlePress={handlePress}
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
  contentContainerStyle: { gap: 16, marginHorizontal: 16 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PokemonLikedList;
