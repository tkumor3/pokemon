import PokemonList from "@components/PokemonList";

import useLikedPokemons from "../hooks/useLikedPokemons";
import { TabScreenProps } from "../Screens/types";
import Error from "./Error";

type Props = Pick<TabScreenProps<"Liked">, "navigation">;

const LikedPokemonList = ({ navigation }: Props) => {
  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    useLikedPokemons();

  const navigateToPokemon = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  if (error) {
    return <Error />;
  }

  return (
    <PokemonList
      pokemons={pokemonIndex}
      loading={loading}
      fetchMore={fetchMore}
      loadingMore={loadingMore}
      navigateToPokemon={navigateToPokemon}
    />
  );
};

export default LikedPokemonList;
