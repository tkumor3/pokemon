import { View, Text, StyleSheet } from "react-native";

const PokemonType = ({ type }: { type: string }) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ffffff4f",
  },
  text: {
    color: "#fff",
    fontSize: 12,
  },
});

export default PokemonType;
