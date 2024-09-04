import { ActivityIndicator, StyleSheet } from "react-native";
import PokemonItem from "../PokemonItem";
import { Pokemon } from "../../types";
import Animated, { FlatListPropsWithLayout } from "react-native-reanimated";
import SearchBar from "./SearchBar";
import NotFound from "./NotFound";

type PokemonListProps = Omit<
  FlatListPropsWithLayout<Pokemon>,
  | "renderItem"
  | "data"
  | "ListFooterComponent"
  | "keyExtractor"
  | "ListEmptyComponent"
  | "onEndReached"
  | "onEndReachedThreshold"
  | "contentContainerStyle"
> & {
  fetchMore: () => void;
  loadingMore: boolean;
  loading: boolean;
  pokemons: Pokemon[] | undefined;
  navigateToPokemon: (name: string) => void;
};
const PokemonList = ({
  pokemons,
  loading,
  fetchMore,
  loadingMore,
  navigateToPokemon,
  ...props
}: PokemonListProps) => (
  <Animated.FlatList
    ListEmptyComponent={pokemons && !loading ? <NotFound /> : null}
    data={pokemons}
    contentContainerStyle={styles.contentContainerStyle}
    renderItem={({ item }) => (
      <PokemonItem
        navigateToPokemon={navigateToPokemon}
        shortName={item.name}
        imageUri={item.imageUri}
        types={item.types}
      />
    )}
    onEndReached={fetchMore}
    onEndReachedThreshold={0.1}
    keyExtractor={(item) => item.name}
    ListFooterComponent={loadingMore || loading ? <ActivityIndicator /> : null}
    {...props}
  />
);

const styles = StyleSheet.create({
  contentContainerStyle: { gap: 16, marginHorizontal: 16 },
});

PokemonList.SearchBar = SearchBar;

export default PokemonList;
