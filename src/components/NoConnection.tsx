import { View, Text, Image } from "react-native";
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
    <View style={{ height: 100 }}>
      <Image
        style={{ flex: 1, height: "100%" }}
        resizeMode="contain"
        source={require("assets/images/pokemon_logo.png")}
      />
    </View>
    <Text>No internet connection</Text>
  </SafeAreaView>
);

export default NoConnection;
