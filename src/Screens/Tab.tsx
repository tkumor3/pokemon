import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Liked from "./Liked";
import { TabStackParamList } from "./types";
import PokemonIndex from "./PokemonIndex";

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabScreen = () => (
  <Tab.Navigator initialRouteName="Search">
    <Tab.Screen
      name="Search"
      component={PokemonIndex}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Liked"
      component={Liked}
    />
  </Tab.Navigator>
);
export default TabScreen;
