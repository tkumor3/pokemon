import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from "./types";

export const getHeaderTitle = (
  route: RouteProp<RootStackParamList, "PokemonListTab">
) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Search" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Search";

  switch (routeName) {
    case "Search":
      return "Search";
    case "Liked":
      return "Liked";
  }
};
