import { PokemonTypes } from "@/src/constants";
import { gql, useQuery } from "@apollo/client";

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
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON_INDEX, {
    variables: {
      offset: 0,
      limit: PAGINATION_LIMIT,
    },
  });
  console.log({ loading, error });

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

  return {
    pokemonIndex,
    fetchMore,
    loading,
    error,
  };
};

export default usePokemons;
