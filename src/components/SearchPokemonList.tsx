import React, { useMemo } from "react";
import PokemonList from "@components/PokemonList";
import usePokemons from "../hooks/usePokemons";
import debounce from "lodash/debounce";
import { TabScreenProps } from "../Screens/types";
import Error from "./Error";
import useSearchBarScrollHandler from "./PokemonList/hooks/useSearchBarScrollHandler";

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
      ListHeaderComponentStyle={PokemonList.SearchBar.ContainerStyle}
    />
  );
};

export default SearchPokemonList;
