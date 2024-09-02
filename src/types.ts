import usePokemons from "./hooks/usePokemons";

export type PokemonList = ReturnType<typeof usePokemons>["pokemonIndex"];
