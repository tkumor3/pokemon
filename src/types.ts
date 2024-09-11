import { PokemonTypes } from "./constants";

export type Pokemon = {
  id: number;
  name: string;
  imageUri: string;
  types: PokemonTypes[];
  evolutions?:
    | {
        id: number;
        name: string;
      }[]
    | undefined;
  statistics?: { name: string; value: number }[] | undefined;
};
