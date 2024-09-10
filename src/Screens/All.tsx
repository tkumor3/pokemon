import React, { useMemo } from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { TabScreenProps } from "./types";
import SearchPokemonList from "@components/SearchPokemonList";
import { ExtendedTheme } from "@constants/themes";
import { useTheme } from "@react-navigation/native";
import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

type Props = TabScreenProps<"All">;

const All = ({ navigation }: Props) => {
  const styles = useStylesWithTheme(stylesheet);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require("assets/images/pokemon_logo.png")}
        />
      </View>
      <SearchPokemonList navigation={navigation} />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  logoImage: { flex: 1, height: "100%" },
});

const stylesheet = createStyleSheet((colors) => ({
  logoImage: { flex: 1, height: "100%" },

  // logoContainer: {
  //   height: 100,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginHorizontal: 24,
  //   marginVertical: 24,
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.backgroundColor,
  // },
}));

export default All;
