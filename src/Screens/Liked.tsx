import PokemonLikedList from "@components/PokemonLikedList";

import { SafeAreaView } from "react-native-safe-area-context";

const Liked = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PokemonLikedList />
    </SafeAreaView>
  );
};
export default Liked;
