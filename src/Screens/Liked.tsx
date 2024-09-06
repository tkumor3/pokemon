import { SafeAreaView } from "react-native-safe-area-context";
import { TabScreenProps } from "./types";
import { StyleSheet } from "react-native";
import LikedPokemonList from "@components/LikedPokemonList";
import { ExtendedTheme } from "@constants/themes";
import { useMemo } from "react";
import { useTheme } from "@react-navigation/native";

type Props = TabScreenProps<"Liked">;

const Liked = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => genStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.container}>
      <LikedPokemonList navigation={navigation} />
    </SafeAreaView>
  );
};

const genStyles = (colors: ExtendedTheme["colors"]) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundColor },
  });
export default Liked;
