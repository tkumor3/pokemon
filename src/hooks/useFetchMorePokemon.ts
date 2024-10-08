import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

type Pokemon = { pokemon_v2_pokemon: { id: number; name: string }[] };

type FetchMore<T extends Pokemon> = ReturnType<typeof useQuery<T>>["fetchMore"];

export const PAGINATION_LIMIT = 10;

const useFetchMorePokemon = <T extends Pokemon>(
  fetchMore: FetchMore<T>,
  loadedPokemonCounter: number,
  key?: string
) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  useEffect(() => {
    setLoadedAll(false);
  }, [key]);

  const handleLoadMore = useCallback(async () => {
    if (loadedAll || loadedPokemonCounter === 0) {
      return;
    }
    setLoadingMore(true);
    try {
      const result = await fetchMore({
        variables: {
          offset: loadedPokemonCounter,
        },
      });
      if (result.data.pokemon_v2_pokemon.length < PAGINATION_LIMIT) {
        setLoadedAll(true);
      }
      return result;
    } catch {
    } finally {
      setLoadingMore(false);
    }
  }, [fetchMore, loadedAll, loadedPokemonCounter]);

  return {
    loadingMore,
    fetchMore: handleLoadMore,
  };
};

export default useFetchMorePokemon;
