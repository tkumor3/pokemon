import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import PokemonList from "@components/PokemonList";
import usePokemons from "../hooks/usePokemons";
import debounce from "lodash/debounce";
import { TabScreenProps } from "../Screens/types";
import Error from "./Error";
import useSearchBarScrollHandler from "./PokemonList/hooks/useSearchBarScrollHandler";
import { SEARCH_HEIGHT } from "./PokemonList/SearchBar";

type Props = Pick<TabScreenProps<"All">, "navigation">;

const SearchPokemonList = ({ navigation }: Props) => {
  const [search, _setSearch] = React.useState("");
  const setSearch = useMemo(() => debounce(_setSearch, 500), []);

  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    usePokemons(search);

  const { scrollHandler, searchBar } = useSearchBarScrollHandler();

  const navigateToPokemon = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  if (error) {
    return <Error />;
  }

  return (
    <PokemonList
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      pokemons={pokemonIndex}
      loading={loading}
      fetchMore={fetchMore}
      loadingMore={loadingMore}
      navigateToPokemon={navigateToPokemon}
      onScroll={scrollHandler}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <PokemonList.SearchBar
          searchBarVisiblePart={searchBar}
          onChange={setSearch}
          loading={loading}
        />
      }
      ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
    />
  );
};

const styles = StyleSheet.create({
  ListHeaderComponentStyle: {
    position: "relative",
    height: SEARCH_HEIGHT,
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

export default SearchPokemonList;
