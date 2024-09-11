import { Text, View, StyleSheet } from "react-native";

import Map from "@components/Map/Map";

import useUserLocation from "../hooks/useUserLocation";

const Location = () => {
  const { errorMsg } = useUserLocation();
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
