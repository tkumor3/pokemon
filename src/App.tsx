// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PokemonIndex from "./Screens/PokemonIndex";
import Pokemon from "./Screens/Pokemon";
import { RootStackParamList, RootTabParamsList } from "./Screens/types";

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
import Search from "./Screens/Search";
import Liked from "./Screens/Liked";

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
          pokemon_v2_pokemon: offsetLimitPagination(["where"]),
        },
      },
    },
  }),
});

const Tab = createBottomTabNavigator<RootTabParamsList>();

function App() {
  return (
    <ApolloProvider client={client}>
      <LikeContextProvider>
        <SafeAreaProvider>
          <NoConnection />
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                options={{ title: "Search", headerShown: false }}
                name="Search"
                component={Search}
              />
              <Tab.Screen
                options={{ title: "Liked", headerShown: false }}
                name="Liked"
                component={Liked}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </LikeContextProvider>
    </ApolloProvider>
  );
}

export default App;
