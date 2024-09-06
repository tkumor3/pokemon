// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./Screens/types";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RetryLink } from "@apollo/client/link/retry";
import NoConnection from "@components/NoConnection";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { LikeContextProvider } from "./contexts/LikedContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Pokemon from "./Screens/Pokemon";
import PokemonListTab from "./Screens/PokemonListTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "./Screens/utils";

const link = from([
  new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => !!error,
    },
  }),
  new HttpLink({ uri: "https://beta.pokeapi.co/graphql/v1beta" }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemon_v2_pokemon: offsetLimitPagination(["$ids", "$like", "$name"]),
        },
      },
    },
  }),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <LikeContextProvider>
          <SafeAreaProvider>
            <NoConnection />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="PokemonListTab">
                <Stack.Screen
                  options={({ route }) => ({
                    headerShown: false,
                    headerTitle: getHeaderTitle(route),
                  })}
                  name="PokemonListTab"
                  component={PokemonListTab}
                />
                <Stack.Screen
                  name="Pokemon"
                  component={Pokemon}
                  options={{ title: "Pokemon" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </LikeContextProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}

export default App;
