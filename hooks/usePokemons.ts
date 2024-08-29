import { PokemonTypes } from "@/src/constants";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_POKEMON_INDEX = gql`
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
`;

type PokemonIndex = {
  name: string;
  imageUri: string;
  types: PokemonTypes[];
};

const PAGINATION_LIMIT = 10;

const usePokemons = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON_INDEX, {
    variables: {
      offset: 0,
      limit: PAGINATION_LIMIT,
    },
  });

  const pokemonIndex: PokemonIndex[] =
    data?.pokemon_v2_pokemon.map((item: any) => {
      return {
        name: item.name,
        imageUri:
          item.pokemon_v2_pokemonsprites[0].sprites["official-artwork"]
            .front_default,
        types: item.pokemon_v2_pokemontypes.map(
          (item: any) => item.pokemon_v2_type.name
        ),
      };
    }) ?? [];

  const handleLoadMore = async () => {
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
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    loadingMore,
    pokemonIndex,
    fetchMore: handleLoadMore,
    loading,
    error,
  };
};

export default usePokemons;
