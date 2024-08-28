// In App.js in a new project

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonIndex from "./Screens/PokemonIndex";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { addEventListener } from "@react-native-community/netinfo";
import NoConnection from "@components/NoConnection";

const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

function App() {
  const [hasConnection, setHasConnection] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      setHasConnection(state.isConnected ?? false);
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);

  if (!hasConnection) {
    return <NoConnection />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Pokemon"
            component={PokemonIndex}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
