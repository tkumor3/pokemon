import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import parsePokemon from "./utils/parsePokemon";
import useFetchMorePokemon, { PAGINATION_LIMIT } from "./useFetchMorePokemon";

const GET_POKEMON_INDEX = gql(`
  query pokemons($offset: Int, $limit: Int, $like: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {name: {_ilike: $like}}) {
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

const usePokemons = (searchQuery?: string) => {
  const search = searchQuery ? `%${searchQuery}%` : "%";
  const { loading, error, data, fetchMore, previousData } = useQuery(
    GET_POKEMON_INDEX,
    {
      variables: {
        offset: 0,
        limit: PAGINATION_LIMIT,
        like: search,
      },
    }
  );

  const pokemonIndex =
    data?.pokemon_v2_pokemon.map(parsePokemon) ??
    previousData?.pokemon_v2_pokemon.map(parsePokemon);

  const { loadingMore, fetchMore: handleLoadMore } = useFetchMorePokemon(
    fetchMore,
    pokemonIndex?.length ?? 0,
    search
  );

  return {
    loadingMore,
    pokemonIndex,
    fetchMore: handleLoadMore,
    loading,
    error,
  };
};

export default usePokemons;
