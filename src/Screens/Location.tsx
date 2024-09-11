import { Text, View } from "react-native";

import Map from "@components/Map/Map";

import useUserLocation from "../hooks/useUserLocation";

import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

const Location = () => {
  const { errorMsg } = useUserLocation();
  const styles = useStylesWithTheme(stylesheet);
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Permission to access location was denied
        </Text>
      </View>
    );
  }

  return <Map />;
};

const stylesheet = createStyleSheet((colors) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
}));

export default Location;
