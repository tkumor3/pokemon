import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

type Props = NativeStackScreenProps<RootStackParamList, "Pokemon">;

const Pokemon = ({ route }: Props) => {
  const { name } = route.params;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Pokemon;
