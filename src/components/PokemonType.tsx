import { View, Text } from "react-native";
import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

const PokemonType = ({ type }: { type: string }) => {
  const styles = useStylesWithTheme(stylesheet);

  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet((colors) => ({
  container: {
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.backgroundOpacity,
  },
  text: {
    color: colors.colorRevert,
    fontSize: 12,
  },
}));

export default PokemonType;
