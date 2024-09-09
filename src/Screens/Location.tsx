import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import useUserLocation from "../hooks/useUserLocation";

const Location = () => {
  const { location, errorMsg } = useUserLocation();

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{errorMsg}</Text>
      </View>
    );
  }
  if (!location) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
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
    backgroundColor: "#fff",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Location;
