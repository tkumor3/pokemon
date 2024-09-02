import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LikeStackParamList } from "./types";
import Pokemon from "./Pokemon";
import LikedList from "./LikedList";

const Stack = createNativeStackNavigator<LikeStackParamList>();

const Liked = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: "Pokemon", headerShown: false }}
        name="LikedPokemon"
        component={LikedList}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: "Pokemon" }}
      />
    </Stack.Navigator>
  );
};

export default Liked;
