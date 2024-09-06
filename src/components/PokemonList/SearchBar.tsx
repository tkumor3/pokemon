import { Theme } from "@constants/colors";
import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import {
  ActivityIndicator,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

type Props = {
  searchBarVisiblePart: SharedValue<number>;
  loading: boolean;
  onChange: (text: string) => void;
};

export const SEARCH_HEIGHT = 70;

const SearchBar = ({ searchBarVisiblePart, onChange, loading }: Props) => {
  const animatedStyle = useAnimatedStyle(() => ({
    top: -SEARCH_HEIGHT + searchBarVisiblePart.value * SEARCH_HEIGHT,
  }));

  const { colors } = useTheme();
  const styles = useMemo(() => genStyles(colors), [colors]);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <View style={styles.searchWithIcon}>
        <TextInput onChangeText={onChange} style={styles.textInput} />
        <View style={styles.iconContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.text}>🔍</Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const genStyles = (colors: Theme["colors"]) =>
  StyleSheet.create({
    ListHeaderComponentStyle: {
      position: "relative",
      height: SEARCH_HEIGHT,
    },
    container: {
      backgroundColor: colors.backgroundColor,
      paddingVertical: 16,
      position: "absolute",
      left: 0,
      right: 0,
    },
    searchWithIcon: { flex: 1, flexDirection: "row", gap: 4 },
    textInput: {
      flex: 1,
      borderWidth: 1,
      padding: 8,
      borderRadius: 8,
      borderColor: colors.border,
      fontSize: 20,
      color: colors.color,
    },
    iconContainer: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
    },
  });

const headerStyles = StyleSheet.create({
  ListHeaderComponentStyle: {
    position: "relative",
    height: SEARCH_HEIGHT,
  },
});

SearchBar.ContainerStyle = headerStyles.ListHeaderComponentStyle;

export default SearchBar;
