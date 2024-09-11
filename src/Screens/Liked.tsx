import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "./types";
import LikedPokemonList from "@components/LikedPokemonList";
import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

type Props = TabScreenProps<"Liked">;

const Liked = ({ navigation }: Props) => {
  const styles = useStylesWithTheme(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <LikedPokemonList navigation={navigation} />
    </SafeAreaView>
  );
};

const stylesheet = createStyleSheet((colors) => ({
  container: { flex: 1, backgroundColor: colors.backgroundColor },
  a: { color: colors.text },
}));

export default Liked;
