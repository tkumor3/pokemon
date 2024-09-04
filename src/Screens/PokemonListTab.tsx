import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Liked from "./Liked";
import { TabStackParamList } from "./types";
import All from "./All";

const Tab = createBottomTabNavigator<TabStackParamList>();

const PokemonListTab = () => (
  <Tab.Navigator initialRouteName="All">
    <Tab.Screen name="All" component={All} options={{ headerShown: false }} />
    <Tab.Screen
      options={{ headerShown: false }}
      name="Liked"
      component={Liked}
    />
  </Tab.Navigator>
);
export default PokemonListTab;
