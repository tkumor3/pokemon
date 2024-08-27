import { gql, useQuery } from "@apollo/client";

const GET_POKEMON_INDEX = gql`
  query pokemons {
    pokemon_v2_pokemon {
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`;

type PokemonIndex = {
  name: string;
  image: string;
};

const usePokemons = () => {
  const { loading, error, data } = useQuery(GET_POKEMON_INDEX);
  const pokemonIndex: PokemonIndex[] =
    data?.pokemon_v2_pokemon.map((item: any) => {
      return {
        name: item.name,
        image: item.pokemon_v2_pokemonsprites[0].sprites,
      };
    }) ?? [];

  return {
    pokemonIndex,
    loading,
    error,
  };
};

export default usePokemons;
