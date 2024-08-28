// In App.js in a new project

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonIndex from "./Screens/PokemonIndex";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Pokemon from "./Screens/Pokemon";
import { RootStackParamList } from "./Screens";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PokemonIndex">
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
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
