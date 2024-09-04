import React from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { TabScreenProps } from "./types";
import { SEARCH_HEIGHT } from "../constants";
import SearchPokemonList from "@components/SearchPokemonList";

type Props = TabScreenProps<"All">;

const All = ({ navigation }: Props) => {
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

const styles = StyleSheet.create({
  logoImage: { flex: 1, height: "100%" },
  logoContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default All;
