import { PokemonQuery } from "../__generated__/graphql";
import { PokemonTypes } from "@/src/constants";

type Pokemon = PokemonQuery["pokemon_v2_pokemon"][number];

export const parsePokemon = (pokemon: Pokemon) => {
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
