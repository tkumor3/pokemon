import { Pokemon } from "@/src/types";
import { PokemonQuery } from "../../__generated__/graphql";
import { PokemonTypes } from "@/src/constants";

type PokemonGql = PokemonQuery["pokemon_v2_pokemon"][number];

const parsePokemon = (pokemon: PokemonGql): Pokemon => {
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
    statistics: pokemon.pokemon_v2_pokemonstats?.map((stat) => ({
      name: stat.pokemon_v2_stat?.name ?? "unknown",
      value: stat.base_stat,
    })),
  };
};

export default parsePokemon;
