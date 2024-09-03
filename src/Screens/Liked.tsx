import PokemonList from "@components/PokemonList";

import { SafeAreaView } from "react-native-safe-area-context";
import useLikedPokemons from "../hooks/useLikedPokemons";
import { TabScreenProps } from "./types";
import { StyleSheet } from "react-native";

type Props = TabScreenProps<"Liked">;

const Liked = ({ navigation }: Props) => {
  const { pokemonIndex, loading, error, fetchMore, loadingMore } =
    useLikedPokemons();

  const navigateToPokemon = (name: string) => {
    return navigation.navigate("Pokemon", { name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PokemonList
        pokemons={pokemonIndex}
        loading={loading}
        error={error}
        fetchMore={fetchMore}
        loadingMore={loadingMore}
        navigateToPokemon={navigateToPokemon}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
export default Liked;
