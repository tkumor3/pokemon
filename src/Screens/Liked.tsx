import PokemonList from "@components/PokemonList";

import { SafeAreaView } from "react-native-safe-area-context";
import useLikedPokemons from "../hooks/useLikedPokemons";
import { TabScreenProps } from "./types";

type Props = TabScreenProps<"Liked">;

const Liked = ({ navigation }: Props) => {
  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    useLikedPokemons();

  const handlePress = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PokemonList
        pokemons={pokemonIndex}
        loading={loading}
        error={error}
        fetchMore={fetchMore}
        loadingMore={loadingMore}
        handlePress={handlePress}
      />
    </SafeAreaView>
  );
};
export default Liked;
