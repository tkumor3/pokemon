import { PokemonTypes } from "@/src/constants";

import { useQuery } from "@apollo/client";
import { gql } from "../__generated__";
import { PokemonQuery } from "../__generated__/graphql";

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

type Pokemon = PokemonQuery["pokemon_v2_pokemon"][number];

const parsePokemon = (pokemon?: Pokemon) => {
  if (!pokemon) return {};

  return {
    id: pokemon.id,
    name: pokemon.name,
    imageUri: pokemon.pokemon_v2_pokemonsprites[0].sprites["official-artwork"]
      .front_default as string,
    types: pokemon.pokemon_v2_pokemontypes
      ?.map((item) => item.pokemon_v2_type?.name)
      .filter((item) => item) as PokemonTypes[],
    evolutions:
      pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain
        ?.pokemon_v2_pokemonspecies,
  };
};

const usePokemon = (name: string) => {
  const { data, error, loading } = useQuery(GET_POKEMON, {
    variables: {
      name,
    },
  });

  const pokemon = parsePokemon(data?.pokemon_v2_pokemon[0]);

  return {
    loading,
    error,
    pokemon,
  };
};

export default usePokemon;
