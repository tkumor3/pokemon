import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

import * as Location from "expo-location";

const Map = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{errorMsg}</Text>
      </View>
    );
  }
  if (!location) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{JSON.stringify(location)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Map;
