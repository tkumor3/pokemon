import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { gql } from "../__generated__";
import { useLikeContext } from "../contexts/LikedContext";
import { parsePokemon } from "./utils";

const GET_POKEMON_INDEX = gql(`
  query liked_pokemons($offset: Int, $limit: Int, $ids: [Int!]) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {id: {_in: $ids}}) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "other")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`);

const PAGINATION_LIMIT = 10;

const useLikedPokemons = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const { likeList } = useLikeContext();
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON_INDEX, {
    variables: {
      offset: 0,
      limit: PAGINATION_LIMIT,
      ids: likeList,
    },
  });

  const pokemonIndex =
    data?.pokemon_v2_pokemon.map((item) => {
      return parsePokemon(item);
    }) ?? [];

  const handleLoadMore = useCallback(async () => {
    if (loadedAll) {
      return;
    }
    setLoadingMore(true);
    try {
      const result = await fetchMore({
        variables: {
          offset: pokemonIndex.length,
        },
      });
      if (result.data.pokemon_v2_pokemon.length < PAGINATION_LIMIT) {
        setLoadedAll(true);
      }
      return result;
    } catch (e) {
    } finally {
      setLoadingMore(false);
    }
  }, [fetchMore, loadedAll, pokemonIndex.length]);

  return {
    loadingMore,
    pokemonIndex,
    fetchMore: handleLoadMore,
    loading,
    error,
  };
};

export default useLikedPokemons;
