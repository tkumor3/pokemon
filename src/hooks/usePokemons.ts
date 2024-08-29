import { PokemonTypes } from "@/src/constants";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";

const GET_POKEMON_INDEX = gql(`
  query pokemons {
    pokemon_v2_pokemon {
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
  const { loading, error, data } = useQuery(GET_POKEMON_INDEX);
  const pokemonIndex =
    data?.pokemon_v2_pokemon.map((item) => {
      return {
        name: item.name,
        imageUri: item.pokemon_v2_pokemonsprites[0].sprites["official-artwork"]
          .front_default as string,
        types: item.pokemon_v2_pokemontypes
          ?.map((item) => item.pokemon_v2_type?.name)
          .filter((item) => item) as PokemonTypes[],
      };
    }) ?? [];

  return {
    pokemonIndex,
    loading,
    error,
  };
};

export default usePokemons;
