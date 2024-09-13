import { client } from "@/src/App";
import { gql } from "@apollo/client";
import * as ExpoLinking from "expo-linking";

function getRandomInt() {
  return Math.floor(Math.random() * 350);
}

const GET_POKEMON = gql(`
    query pokemon_name($id: Int) {
      pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
        name
      }
    }
  `);

const prefix = ExpoLinking.createURL("/");

const getRandomPokemonUrl = async () => {
  const pokemonId = getRandomInt();
  const data = await client.query({
    query: GET_POKEMON,
    variables: { id: pokemonId },
  });

  const name = data.data.pokemon_v2_pokemon[0].name;
  return `${prefix}pokemon/${name}`;
};

export default getRandomPokemonUrl;
