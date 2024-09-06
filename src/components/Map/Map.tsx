import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation
        cameraZoomRange={{
          animated: true,
          minCenterCoordinateDistance: 100,
          maxCenterCoordinateDistance: 30000,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
