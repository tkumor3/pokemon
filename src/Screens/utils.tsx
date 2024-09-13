import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { LinkingOptions } from "@react-navigation/native";
import { Linking } from "react-native";
import * as Notifications from "expo-notifications";
import { client } from "../App";
import { gql } from "../__generated__";
import * as ExpoLinking from "expo-linking";

export const getHeaderTitle = (
  route: RouteProp<RootStackParamList, "PokemonListTab">
) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Search" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";

  return routeName;
};

type GetInitialURLType = LinkingOptions<{}>["getInitialURL"];

export const getInitialURL: GetInitialURLType = async () => {
  // First, you may want to do the default deep link handling
  // Check if app was opened from a deep link
  const url = await Linking.getInitialURL();

  if (url != null) {
    return url;
  }
  console.log("getInitialURL");
  // Handle URL from expo push notifications
  const response = await Notifications.getLastNotificationResponseAsync();

  return response?.notification.request.content.data.url;
};

type SubscribeType = LinkingOptions<{}>["subscribe"];

export const subscribe: SubscribeType = (listener) => {
  const onReceiveURL = ({ url }: { url: string }) => listener(url);

  // Listen to incoming links from deep linking
  const eventListenerSubscription = Linking.addEventListener(
    "url",
    onReceiveURL
  );

  // Listen to expo push notifications
  const subscription = Notifications.addNotificationResponseReceivedListener(
    async (response) => {
      const type = response.notification.request.content.data.type;

      if (type === "pokemonOfTheDay") {
        const url = await getRandomPokemonUrl();
        listener(url);
      }
    }
  );

  return () => {
    // Clean up the event listeners
    eventListenerSubscription.remove();
    subscription.remove();
  };
};

function getRandomInt() {
  return Math.floor(Math.random() * 350);
}

const GET_POKEMON = gql(`
  query pokemon_name($id: Int) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      name
    }
  }
`);

const prefix = ExpoLinking.createURL("/");

const getRandomPokemonUrl = async () => {
  const pokemonId = getRandomInt();
  const data = await client.query({
    query: GET_POKEMON,
    variables: { id: pokemonId },
  });

  const name = data.data.pokemon_v2_pokemon[0].name;
  return `${prefix}pokemon/${name}`;
};
