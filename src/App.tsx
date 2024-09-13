// In App.js in a new project

import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./Screens/types";
import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NoConnection from "@components/NoConnection";
import { LikeContextProvider } from "./contexts/LikedContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Pokemon from "./Screens/Pokemon";
import PokemonListTab from "./Screens/PokemonListTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle, getInitialURL, subscribe } from "./Screens/utils";
import capitalize from "lodash/capitalize";
import StatisticsModal from "./Screens/StatisticsModal";
import Location from "./Screens/Location";
import { useColorScheme } from "react-native";
import { LightTheme, DarkTheme } from "@constants/themes";

import * as ExpoLinking from "expo-linking";

import "@notifications/initialize";
import { client } from "./client";

const prefix = ExpoLinking.createURL("/");

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const scheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <LikeContextProvider>
          <SafeAreaProvider>
            <NoConnection />
            <NavigationContainer
              theme={scheme === "dark" ? DarkTheme : LightTheme}
              linking={{
                prefixes: [prefix],
                config: {
                  screens: { Pokemon: "pokemon/:name" },
                },
                getInitialURL,
                subscribe,
              }}
            >
              <Stack.Navigator initialRouteName="Location">
                <Stack.Group>
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
                    options={({ route }) => ({
                      title: capitalize(route.params.name),
                    })}
                  />
                  <Stack.Screen
                    name="Location"
                    component={Location}
                    options={{ title: "Location" }}
                  />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen
                    name="StatisticsModal"
                    component={StatisticsModal}
                    options={{ title: "Statistics" }}
                  />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </LikeContextProvider>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}

export default App;
