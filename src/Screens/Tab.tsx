import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Liked from "./Liked";
import { TabStackParamList } from "./types";
import PokemonIndex from "./PokemonIndex";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{ title: "Search", headerShown: false }}
      name="Search"
      component={PokemonIndex}
    />
    <Tab.Screen
      options={{ title: "Liked", headerShown: false }}
      name="Liked"
      component={Liked}
    />
  </Tab.Navigator>
);
export default TabScreen;
