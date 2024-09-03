import { PokemonTypes } from "./constants";

export type Pokemon = {
  id: number;
  name: string;
  imageUri: string;
  types: PokemonTypes[];
  evolutions:
    | {
        __typename?: "pokemon_v2_pokemonspecies";
        id: number;
        name: string;
      }[]
    | undefined;
};
