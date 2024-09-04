import React from "react";

import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import PokemonList from "@components/PokemonList";
import { getSystem } from "../../modules/system-checker";

const PokemonIndex = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text>{getSystem()}</Text>
      </View>
      <PokemonList />
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

export default PokemonIndex;
