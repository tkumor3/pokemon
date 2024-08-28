// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonIndex from "./Screens/PokemonIndex";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import NoConnection from "@components/NoConnection";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NoConnection>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Pokemon"
              component={PokemonIndex}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NoConnection>
    </ApolloProvider>
  );
}

export default App;
