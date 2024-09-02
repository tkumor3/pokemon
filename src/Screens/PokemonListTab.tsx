import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Liked from "./Liked";
import { TabStackParamList } from "./types";
import Search from "./Search";

const Tab = createBottomTabNavigator<TabStackParamList>();

const PokemonListTab = () => (
  <Tab.Navigator initialRouteName="Search">
    <Tab.Screen
      name="Search"
      component={Search}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Liked"
      component={Liked}
    />
  </Tab.Navigator>
);
export default PokemonListTab;
