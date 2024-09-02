import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { PokemonQuery } from "../__generated__/graphql";
import { parsePokemon } from "./utils";

const GET_POKEMON = gql(`
  query pokemon($name: String) {
    pokemon_v2_pokemon(where: {name: {_eq: $name}}) {
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
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            id
            name
          }
        }
      }
    }
  }
`);

const usePokemon = (name: string) => {
  const { data, error, loading } = useQuery(GET_POKEMON, {
    variables: {
      name,
    },
  });

  const pokemon = data?.pokemon_v2_pokemon[0]
    ? parsePokemon(data?.pokemon_v2_pokemon[0])
    : undefined;

  return {
    loading,
    error,
    pokemon,
  };
};

export default usePokemon;
