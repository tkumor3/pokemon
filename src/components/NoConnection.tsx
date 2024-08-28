import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NoConnection = () => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text>No internet connection</Text>
  </SafeAreaView>
);

export default NoConnection;
