import { ActivityIndicator, TextInput, View, Text } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
  animatedStyle: { top: number };
  loading: boolean;
  onChange: (text: string) => void;
};

const SearchBar = ({ animatedStyle, onChange, loading }: Props) => {
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          backgroundColor: "#fff",
          paddingVertical: 16,
          position: "absolute",
          left: 0,
          right: 0,
          zIndex: 1,
        },
      ]}
    >
      <View style={{ flex: 1, flexDirection: "row", gap: 4 }}>
        <TextInput
          onChangeText={onChange}
          style={{
            flex: 1,
            borderWidth: 1,
            padding: 8,
            borderRadius: 8,
            borderColor: "#d3d3d3",
            fontSize: 20,
          }}
        />
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ fontSize: 20 }}>🔍</Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default SearchBar;
