import { TextInput } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
  animatedStyle: { top: number };

  onChange: (text: string) => void;
};

const SearchBar = ({ animatedStyle, onChange }: Props) => {
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          backgroundColor: "#fff",
          paddingVertical: 16,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        },
      ]}
    >
      <TextInput
        onChangeText={onChange}
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 8,
          borderColor: "#d3d3d3",
          fontSize: 20,
        }}
      />
    </Animated.View>
  );
};

export default SearchBar;
