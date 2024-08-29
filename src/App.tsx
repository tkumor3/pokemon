// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonIndex from "./Screens/PokemonIndex";
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
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NoConnection />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Pokemon"
              component={PokemonIndex}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}

export default App;
