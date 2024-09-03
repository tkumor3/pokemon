import { View, Text, StyleSheet } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text>Not Found</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotFound;
