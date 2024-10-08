import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { addEventListener } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { POKEMON_TYPE_COLORS } from "../constants";
import { useTheme } from "@react-navigation/native";

const NoConnection = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [hasConnection, setHasConnection] = useState(true);
  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setHasConnection(state.isConnected ?? false);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  return (
    !hasConnection && (
      <View
        style={{
          position: "absolute",
          top: insets.top,
          right: 0,
          left: 0,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: POKEMON_TYPE_COLORS.fire,
          zIndex: 999,
        }}
      >
        <Text style={{ color: colors.color }}>No internet connection</Text>
      </View>
    )
  );
};

export default NoConnection;
