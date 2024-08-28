import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addEventListener } from "@react-native-community/netinfo";
import { PropsWithChildren, useEffect, useState } from "react";

const NoConnection = ({ children }: PropsWithChildren) => {
  const [hasConnection, setHasConnection] = useState(true);
  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setHasConnection(state.isConnected ?? false);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  return hasConnection ? (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text>No internet connection</Text>
    </SafeAreaView>
  ) : (
    children
  );
};

export default NoConnection;
