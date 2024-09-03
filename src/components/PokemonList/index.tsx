import Error from "@components/Error";
import { ActivityIndicator, StyleSheet } from "react-native";
import PokemonItem from "../PokemonItem";
import { ApolloError } from "@apollo/client";
import { Pokemon } from "../../types";
import Animated, { FlatListPropsWithLayout } from "react-native-reanimated";
import SearchBar from "./SearchBar";
import useScrollHandler from "./hooks/useScrollHandler";
import NotFound from "./NotFound";

type Props = {
  pokemons: Pokemon[];
  loading: boolean;
  error?: ApolloError;
  fetchMore: () => void;
  loadingMore: boolean;
  navigateToPokemon: (name: string) => void;
  onScroll?: FlatListPropsWithLayout<Pokemon[]>["onScroll"];
  ListHeaderComponent?: FlatListPropsWithLayout<
    Pokemon[]
  >["ListHeaderComponent"];
  stickyHeaderIndices?: FlatListPropsWithLayout<
    Pokemon[]
  >["stickyHeaderIndices"];
  ListHeaderComponentStyle?: FlatListPropsWithLayout<
    Pokemon[]
  >["ListHeaderComponentStyle"];
};

const PokemonList = ({
  pokemons,
  loading,
  error,
  fetchMore,
  loadingMore,
  navigateToPokemon,
  onScroll,
  ListHeaderComponent,
  stickyHeaderIndices,
  ListHeaderComponentStyle,
}: Props) => {
  if (error) {
    return <Error />;
  }

  return (
    <Animated.FlatList
      keyboardDismissMode="on-drag"
      stickyHeaderIndices={stickyHeaderIndices}
      contentContainerStyle={styles.contentContainerStyle}
      ListHeaderComponent={ListHeaderComponent}
      ListHeaderComponentStyle={ListHeaderComponentStyle}
      ListEmptyComponent={<NotFound />}
      data={pokemons}
      renderItem={({ item }) => (
        <PokemonItem
          navigateToPokemon={navigateToPokemon}
          shortName={item.name}
          imageUri={item.imageUri}
          types={item.types}
        />
      )}
      onScroll={onScroll}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.1}
      keyExtractor={(item) => item.name}
      ListFooterComponent={
        loadingMore || loading ? <ActivityIndicator /> : null
      }
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

export { useScrollHandler };

PokemonList.SearchBar = SearchBar;

export default PokemonList;
