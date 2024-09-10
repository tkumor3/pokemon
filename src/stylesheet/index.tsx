import { ExtendedTheme } from "@constants/themes";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type Colors = ExtendedTheme["colors"];

export const useStylesWithTheme = (
  stylesheet: ReturnType<typeof createStyleSheet>
) => {
  const { colors } = useTheme();
  const styles = useMemo(() => stylesheet(colors), [colors, stylesheet]);
  return styles;
};

export const createStyleSheet =
  <T extends StyleSheet.NamedStyles<T>>(fun: (colors: Colors) => T) =>
  (colors: Colors) => {
    return StyleSheet.create(fun(colors));
  };

const a = createStyleSheet((c) => ({
  test: {
    color: c.backgroundColor,
  },
}));
