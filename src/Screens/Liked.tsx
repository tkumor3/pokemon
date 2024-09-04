import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "./types";
import { StyleSheet } from "react-native";
import LikedPokemonList from "@components/LikedPokemonList";

type Props = TabScreenProps<"Liked">;

const Liked = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LikedPokemonList navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});
export default Liked;
