import { Theme } from "@constants/colors";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";

const PokemonType = ({ type }: { type: string }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => genStyles(colors), [colors]);

  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>{type}</Text>
    </View>
  );
};

const genStyles = (colors: Theme["colors"]) =>
  StyleSheet.create({
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
  });

export default PokemonType;
