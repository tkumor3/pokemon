import { client } from "@/src/client";

import { gql } from "@apollo/client";
import * as ExpoLinking from "expo-linking";
import getPokemonOfDayId from "./getPokemonOfDayId";

const GET_POKEMON = gql(`
    query pokemon_name($id: Int) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        name
      }
    }
  `);

const prefix = ExpoLinking.createURL("/");

export const DEFAULT_POKEMON_URL: string = `${prefix}pokemon/magnemite`;

export const getRandomPokemonUrl = async () => {
  const pokemonId = await getPokemonOfDayId();
  const data = await client.query({
    fetchPolicy: "network-only",
    query: GET_POKEMON,
    variables: { id: pokemonId },
  });

  const name = data.data.pokemon_v2_pokemon[0].name;
  return `${prefix}pokemon/${name}`;
};
