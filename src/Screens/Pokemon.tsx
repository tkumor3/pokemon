import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { About, Evolutions, Moves, Stats } from "./Pokemon/";

const Tab = createBottomTabNavigator();

const Pokemon = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Evolutions" component={Evolutions} />
        <Tab.Screen name="Moves" component={Moves} />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Pokemon;
