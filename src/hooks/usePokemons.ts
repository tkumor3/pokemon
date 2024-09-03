import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import parsePokemon from "./utils/parsePokemon";
import useFetchMorePokemon, { PAGINATION_LIMIT } from "./useFetchMorePokemon";

const GET_POKEMON_INDEX = gql(`
  query pokemons($offset: Int, $limit: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
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

const usePokemons = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON_INDEX, {
    variables: {
      offset: 0,
      limit: PAGINATION_LIMIT,
    },
  });

  const pokemonIndex = data?.pokemon_v2_pokemon.map(parsePokemon) ?? [];

  const { loadingMore, fetchMore: handleLoadMore } = useFetchMorePokemon(
    fetchMore,
    pokemonIndex.length
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
