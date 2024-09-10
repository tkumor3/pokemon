import { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Map from "@components/Map/Map";
import * as LocationLib from "expo-location";

import { createStyleSheet, useStylesWithTheme } from "../stylesheet";

const Location = () => {
  const styles = useStylesWithTheme(stylesheet);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await LocationLib.requestForegroundPermissionsAsync();
      setStatus(status);
    })();
  }, []);

  if (status === null) return <ActivityIndicator />;

  if (status !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {"Permission to access location was denied"}
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
