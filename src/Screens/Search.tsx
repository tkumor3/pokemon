import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import PokemonIndex from "./PokemonIndex";
import Pokemon from "./Pokemon";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: "Pokemon", headerShown: false }}
        name="PokemonIndex"
        component={PokemonIndex}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{ title: "Pokemon" }}
      />
    </Stack.Navigator>
  );
};

export default Search;
